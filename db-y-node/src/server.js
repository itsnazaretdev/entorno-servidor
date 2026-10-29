require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const helmet = require('helmet');
const methodOverride = require('method-override');
const pool = require('./db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const { ensureAdmin } = require('./seed');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(session({
  store: new PgSession({ pool, tableName: 'session', createTableIfMissing: true }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 1000 * 60 * 60 * 8 }
}));
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.message = req.session.message || null;
  delete req.session.message;
  next();
});

app.get('/', (req, res) => res.redirect('/productos'));
app.use('/', authRoutes);
app.use('/productos', productRoutes);
app.use((req, res) => res.status(404).render('404', { title: 'Página no encontrada' }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { title: 'Error', message: 'Ha ocurrido un error interno.' });
});

async function start() {
  if (!process.env.SESSION_SECRET) throw new Error('Define SESSION_SECRET en .env');
  await pool.query('SELECT 1');
  await ensureAdmin();
  app.listen(PORT, () => console.log(`Servidor disponible en http://localhost:${PORT}`));
}
start().catch(err => { console.error('No se pudo iniciar la aplicación:', err); process.exit(1); });
