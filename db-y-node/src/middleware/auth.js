function requireAuth(req, res, next) {
  if (!req.session.user) {
    req.session.message = { type: 'info', text: 'Inicia sesión para continuar.' };
    return res.redirect('/login');
  }
  next();
}
module.exports = { requireAuth };
