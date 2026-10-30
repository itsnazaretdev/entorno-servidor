const pool = require('../db');

async function getAll() {
  const { rows } = await pool.query(
    `SELECT id, nombre, categoria, descripcion, precio, created_at
     FROM products ORDER BY created_at DESC`
  );
  return rows;
}

async function getById(id) {
  const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return rows[0] || null;
}

async function create(product) {
  await pool.query(
    'INSERT INTO products (nombre, categoria, descripcion, precio) VALUES ($1, $2, $3, $4)',
    [product.nombre.trim(), product.categoria.trim(), product.descripcion?.trim() || null, product.precio]
  );
}

async function update(id, product) {
  const result = await pool.query(
    `UPDATE products SET nombre=$1, categoria=$2, descripcion=$3, precio=$4, updated_at=NOW()
     WHERE id=$5`,
    [product.nombre.trim(), product.categoria.trim(), product.descripcion?.trim() || null, product.precio, id]
  );
  return result.rowCount > 0;
}

async function remove(id) {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
}

async function hasAny() {
  const { rowCount } = await pool.query('SELECT 1 FROM products LIMIT 1');
  return rowCount > 0;
}

async function createExamples() {
  await pool.query(
    `INSERT INTO products (nombre, categoria, descripcion, precio)
     VALUES
       ($1, $2, $3, $4),
       ($5, $6, $7, $8),
       ($9, $10, $11, $12),
       ($13, $14, $15, $16)`,
    [
      'Auriculares inalámbricos', 'Electrónica', 'Auriculares Bluetooth con estuche de carga.', 49.99,
      'Mochila urbana', 'Accesorios', 'Mochila resistente con compartimento para portátil.', 39.90,
      'Botella térmica', 'Hogar', 'Botella de acero inoxidable que mantiene la temperatura.', 18.50,
      'Lámpara de escritorio', 'Iluminación', 'Lámpara LED regulable para escritorio.', 27.95
    ]
  );
}

module.exports = { getAll, getById, create, update, remove, hasAny, createExamples };
