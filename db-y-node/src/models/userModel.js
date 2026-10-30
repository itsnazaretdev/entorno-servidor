const pool = require('../db');

async function findByEmail(email) {
  const { rows } = await pool.query(
    'SELECT id, name, email, password_hash FROM users WHERE email = $1',
    [email]
  );
  return rows[0] || null;
}

async function create(user) {
  await pool.query(
    'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)',
    [user.name, user.email, user.passwordHash]
  );
}

module.exports = { findByEmail, create };
