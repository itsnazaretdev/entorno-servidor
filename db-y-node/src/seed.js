const bcrypt = require('bcrypt');
const pool = require('./db');

async function ensureAdmin() {
  const name = process.env.ADMIN_NAME || 'Administrador';
  const email = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) {
    throw new Error('ADMIN_PASSWORD debe tener al menos 12 caracteres. Configúralo en .env');
  }
  const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (exists.rowCount === 0) {
    const hash = await bcrypt.hash(password, 12);
    await pool.query('INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)', [name, email, hash]);
    console.log(`Usuario administrador creado: ${email}`);
  }
}
module.exports = { ensureAdmin };
