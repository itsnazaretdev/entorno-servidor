const pool = require('../config/db');

// Incluye password_hash: solo se usa en el login para comparar
async function findByEmail(email) {
  const { rows } = await pool.query(
    'SELECT id, email, password_hash, role FROM users WHERE email = $1',
    [email.toLowerCase()]
  );
  return rows[0] || null;
}

// Devuelve el usuario SIN el hash
async function create({ email, passwordHash, role = 'admin' }) {
  const { rows } = await pool.query(
    `INSERT INTO users (email, password_hash, role)
     VALUES ($1, $2, $3)
     RETURNING id, email, role, created_at`,
    [email.toLowerCase(), passwordHash, role]
  );
  return rows[0];
}

module.exports = { findByEmail, create };
