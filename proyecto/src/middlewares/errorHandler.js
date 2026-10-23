function wantsJson(req) {
  return req.originalUrl.startsWith('/api');
}

// Ninguna ruta coincide
function notFound(req, res) {
  if (wantsJson(req)) {
    return res.status(404).json({ error: 'Ruta no encontrada' });
  }
  res.status(404).render('errors/404', { title: 'No encontrado' });
}

// Errores no controlados (Express 5 envía aquí también los errores de funciones async)
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);

  const isProduction = process.env.NODE_ENV === 'production';
  const status = err.status || 500;

  if (wantsJson(req)) {
    return res.status(status).json({
      error: 'Error interno del servidor',
      ...(isProduction ? {} : { detail: err.message }),
    });
  }

  res.status(status).render('errors/500', {
    title: 'Error',
    detail: isProduction ? null : err.message,
  });
}

module.exports = { notFound, errorHandler };
