const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, nombre, categoria, descripcion, precio, created_at
       FROM products ORDER BY created_at DESC`
    );
    res.render('products/index', { title: 'Catálogo de productos', products: rows });
  } catch (err) { next(err); }
});

router.get('/nuevo', requireAuth, (req, res) => {
  res.render('products/form', { title: 'Nuevo producto', product: {}, action: '/productos', errors: [] });
});

const validateProduct = [
  body('nombre').trim().isLength({ min: 2, max: 180 }).withMessage('El nombre debe tener entre 2 y 180 caracteres.'),
  body('categoria').trim().isLength({ min: 2, max: 120 }).withMessage('La categoría debe tener entre 2 y 120 caracteres.'),
  body('descripcion').trim().isLength({ max: 5000 }).withMessage('La descripción no puede superar 5000 caracteres.'),
  body('precio').isFloat({ min: 0 }).withMessage('Introduce un precio válido igual o superior a cero.')
];

router.post('/', requireAuth, validateProduct, async (req, res, next) => {
  const errors = validationResult(req);
  const product = req.body;
  if (!errors.isEmpty()) return res.status(422).render('products/form', { title: 'Nuevo producto', product, action: '/productos', errors: errors.array() });
  try {
    await pool.query(
      'INSERT INTO products (nombre, categoria, descripcion, precio) VALUES ($1, $2, $3, $4)',
      [product.nombre.trim(), product.categoria.trim(), product.descripcion?.trim() || null, product.precio]
    );
    req.session.message = { type: 'success', text: 'Producto creado correctamente.' };
    res.redirect('/productos');
  } catch (err) { next(err); }
});

router.get('/:id/editar', requireAuth, async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (!rows[0]) return res.status(404).render('404', { title: 'Producto no encontrado' });
    res.render('products/form', { title: 'Editar producto', product: rows[0], action: `/productos/${rows[0].id}?_method=PUT`, errors: [] });
  } catch (err) { next(err); }
});

router.put('/:id', requireAuth, validateProduct, async (req, res, next) => {
  const errors = validationResult(req);
  const product = { ...req.body, id: req.params.id };
  if (!errors.isEmpty()) return res.status(422).render('products/form', { title: 'Editar producto', product, action: `/productos/${req.params.id}?_method=PUT`, errors: errors.array() });
  try {
    const result = await pool.query(
      `UPDATE products SET nombre=$1, categoria=$2, descripcion=$3, precio=$4, updated_at=NOW()
       WHERE id=$5`,
      [product.nombre.trim(), product.categoria.trim(), product.descripcion?.trim() || null, product.precio, req.params.id]
    );
    if (!result.rowCount) return res.status(404).render('404', { title: 'Producto no encontrado' });
    req.session.message = { type: 'success', text: 'Producto actualizado correctamente.' };
    res.redirect('/productos');
  } catch (err) { next(err); }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    req.session.message = { type: 'success', text: 'Producto eliminado.' };
    res.redirect('/productos');
  } catch (err) { next(err); }
});

module.exports = router;
