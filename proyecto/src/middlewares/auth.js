// Protege las rutas de /admin
function requireAdmin(req, res, next) {
  const user = req.session.user;
  if (!user || user.role !== 'admin') {
    return res.redirect('/login');
  }
  next();
}

// Si ya hay sesión, no tiene sentido volver a mostrar login o registro
function redirectIfLoggedIn(req, res, next) {
  if (req.session.user) {
    return res.redirect('/admin');
  }
  next();
}

// Datos disponibles en todas las vistas
function setLocals(req, res, next) {
  res.locals.user = req.session.user || null;
  res.locals.currentPath = req.path;

  // Mensaje de un solo uso (se muestra una vez y se borra)
  res.locals.flash = req.session.flash || null;
  delete req.session.flash;

  next();
}

module.exports = { requireAdmin, redirectIfLoggedIn, setLocals };
