const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const pool = require('./db');

const TWO_HOURS = 1000 * 60 * 60 * 2;

const sessionMiddleware = session({
  store: new PgSession({
    pool,
    tableName: 'session', // creada en db/01-schema.sql
  }),
  name: 'productos.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: TWO_HOURS,
    // Solo true si la web se sirve por HTTPS; en localhost (HTTP) debe ser false
    secure: process.env.COOKIE_SECURE === 'true',
  },
});

module.exports = sessionMiddleware;
