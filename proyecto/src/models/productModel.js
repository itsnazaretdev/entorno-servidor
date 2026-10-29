const pool = require('../config/db');

// PostgreSQL devuelve NUMERIC como texto ("89.90"); lo pasamos a número
function toProduct(row) {
  if (!row) return null;
  return { ...row, price: Number(row.price) };
}

async function findAll() {
  const { rows } = await pool.query(
    'SELECT * FROM products ORDER BY created_at ASC, name ASC'
  );
  return rows.map(toProduct);
}

async function findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM products WHERE id = $1',
    [id]
  );
  return toProduct(rows[0]);
}

async function create({ name, description, price, stock, image_url }) {
  const { rows } = await pool.query(
    `INSERT INTO products (name, description, price, stock, image_url)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, description, price, stock, image_url]
  );
  return toProduct(rows[0]);
}

async function update(id, { name, description, price, stock, image_url }) {
  const { rows } = await pool.query(
    `UPDATE products
        SET name = $1, description = $2, price = $3, stock = $4,
            image_url = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING *`,
    [name, description, price, stock, image_url, id]
  );
  return toProduct(rows[0]);
}

async function remove(id) {
  const { rowCount } = await pool.query(
    'DELETE FROM products WHERE id = $1',
    [id]
  );
  return rowCount > 0;
}

module.exports = { findAll, findById, create, update, remove };
