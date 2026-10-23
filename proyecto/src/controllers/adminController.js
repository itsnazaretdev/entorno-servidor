const Product = require('../models/productModel');
const isUuid = require('../utils/isUuid');
const { validateProduct } = require('../utils/validators');

function notFound(res) {
  return res.status(404).render('errors/404', { title: 'No encontrado' });
}

function renderForm(res, { product, errors = [], isEdit, status = 200 }) {
  res.status(status).render('admin/product-form', {
    title: isEdit ? 'Editar producto' : 'Nuevo producto',
    product,
    errors,
    isEdit,
  });
}

// GET /admin
async function dashboard(req, res) {
  const products = await Product.findAll();
  res.render('admin/dashboard', { title: 'Panel de administración', products });
}

// GET /admin/productos/nuevo
function showCreateForm(req, res) {
  renderForm(res, { product: {}, isEdit: false });
}

// POST /admin/productos
async function create(req, res) {
  const { errors, data } = validateProduct(req.body);

  if (errors.length > 0) {
    return renderForm(res, { product: req.body, errors, isEdit: false, status: 422 });
  }

  const product = await Product.create(data);
  req.session.flash = `Producto "${product.name}" creado.`;
  res.redirect('/admin');
}

// GET /admin/productos/:id/editar
async function showEditForm(req, res) {
  const { id } = req.params;
  const product = isUuid(id) ? await Product.findById(id) : null;
  if (!product) return notFound(res);

  renderForm(res, { product, isEdit: true });
}

// PUT /admin/productos/:id
async function update(req, res) {
  const { id } = req.params;
  if (!isUuid(id)) return notFound(res);

  const { errors, data } = validateProduct(req.body);

  if (errors.length > 0) {
    return renderForm(res, {
      product: { ...req.body, id },
      errors,
      isEdit: true,
      status: 422,
    });
  }

  const product = await Product.update(id, data);
  if (!product) return notFound(res);

  req.session.flash = `Producto "${product.name}" actualizado.`;
  res.redirect('/admin');
}

// DELETE /admin/productos/:id
async function remove(req, res) {
  const { id } = req.params;
  const deleted = isUuid(id) ? await Product.remove(id) : false;
  if (!deleted) return notFound(res);

  req.session.flash = 'Producto eliminado.';
  res.redirect('/admin');
}

module.exports = { dashboard, showCreateForm, create, showEditForm, update, remove };
