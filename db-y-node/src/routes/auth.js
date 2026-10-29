const router = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../db');

router.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/productos');
  res.render('login', { title: 'Iniciar sesión' });
});

router.post('/login', async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const result = await pool.query('SELECT id, name, email, password_hash FROM users WHERE email = $1', [email]);
    const account = result.rows[0];
    if (!account || !(await bcrypt.compare(password, account.password_hash))) {
      req.session.message = { type: 'error', text: 'Correo o contraseña incorrectos.' };
      return res.redirect('/login');
    }
    req.session.regenerate(err => {
      if (err) return next(err);
      req.session.user = { id: account.id, name: account.name, email: account.email };
      res.redirect('/productos');
    });
  } catch (err) { next(err); }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err);
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});
module.exports = router;
