const path = require('path');
const express = require('express');
const methodOverride = require('method-override');

const sessionMiddleware = require('./config/session');
const { setLocals } = require('./middlewares/auth');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 1. Archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, '..', 'public')));

// 2. Lectura de formularios y JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Permite PUT y DELETE desde formularios: <form method="POST" action="...?_method=DELETE">
app.use(methodOverride('_method'));

// 3. Sesión y datos comunes para las vistas
app.use(sessionMiddleware);
app.use(setLocals);

// 4. Rutas
app.use('/', authRoutes);
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);
app.use('/', productRoutes);

// 5. 404 y errores (siempre al final)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
