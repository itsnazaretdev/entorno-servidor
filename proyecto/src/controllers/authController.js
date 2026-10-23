const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { validateCredentials } = require('../utils/validators');

const SALT_ROUNDS = 10;
const LOGIN_ERROR = 'Email o contraseña incorrectos.';

// Crea una sesión nueva (evita reutilizar el id de sesión anterior) y guarda el usuario
function startSession(req, user) {
  return new Promise((resolve, reject) => {
    req.session.regenerate((err) => {
      if (err) return reject(err);
      req.session.user = { id: user.id, email: user.email, role: user.role };
      req.session.save((saveErr) => (saveErr ? reject(saveErr) : resolve()));
    });
  });
}

// GET /register
function showRegister(req, res) {
  res.render('auth/register', { title: 'Registro', errors: [], old: {} });
}

// POST /register
async function register(req, res) {
  const { errors, data } = validateCredentials(req.body, { isRegister: true });

  if (errors.length === 0 && (await User.findByEmail(data.email))) {
    errors.push('Ya existe una cuenta con ese email.');
  }

  if (errors.length > 0) {
    return res.status(422).render('auth/register', {
      title: 'Registro',
      errors,
      old: { email: data.email },
    });
  }

  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
  const user = await User.create({ email: data.email, passwordHash, role: 'admin' });

  await startSession(req, user);
  req.session.flash = 'Cuenta creada. ¡Bienvenida al panel!';
  res.redirect('/admin');
}

// GET /login
function showLogin(req, res) {
  res.render('auth/login', { title: 'Iniciar sesión', errors: [], old: {} });
}

// POST /login
async function login(req, res) {
  const { errors, data } = validateCredentials(req.body);

  const renderError = (messages) =>
    res.status(401).render('auth/login', {
      title: 'Iniciar sesión',
      errors: messages,
      old: { email: data.email },
    });

  if (errors.length > 0) return renderError(errors);

  const user = await User.findByEmail(data.email);
  const passwordOk = user && (await bcrypt.compare(data.password, user.password_hash));

  // Mismo mensaje tanto si el email no existe como si la contraseña falla
  if (!passwordOk) return renderError([LOGIN_ERROR]);

  await startSession(req, user);
  res.redirect('/admin');
}

// POST /logout
function logout(req, res, next) {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('productos.sid');
    res.redirect('/');
  });
}

module.exports = { showRegister, register, showLogin, login, logout };
