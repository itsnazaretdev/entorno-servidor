const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

function loginForm(req, res) {
  if (req.session.user) return res.redirect('/productos');
  res.render('login', { title: 'Iniciar sesión' });
}

async function login(req, res, next) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const account = await userModel.findByEmail(email);
    if (!account || !(await bcrypt.compare(password, account.password_hash))) {
      req.session.message = { type: 'error', text: 'Correo o contraseña incorrectos.' };
      return res.redirect('/login');
    }

    req.session.regenerate(err => {
      if (err) return next(err);
      req.session.user = { id: account.id, name: account.name, email: account.email };
      res.redirect('/productos');
    });
  } catch (err) {
    next(err);
  }
}

function logout(req, res, next) {
  req.session.destroy(err => {
    if (err) return next(err);
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
}

module.exports = { loginForm, login, logout };
