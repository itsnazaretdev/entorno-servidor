const { validationResult } = require('express-validator');
const productModel = require('../models/productModel');

async function list(req, res, next) {
  try {
    const products = await productModel.getAll();
    res.render('products/index', { title: 'Catálogo de productos', products });
  } catch (err) {
    next(err);
  }
}

async function listJson(req, res, next) {
  try {
    const products = await productModel.getAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

function newForm(req, res) {
  res.render('products/form', { title: 'Nuevo producto', product: {}, action: '/productos', errors: [] });
}

async function create(req, res, next) {
  const errors = validationResult(req);
  const product = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).render('products/form', {
      title: 'Nuevo producto',
      product,
      action: '/productos',
      errors: errors.array()
    });
  }

  try {
    await productModel.create(product);
    req.session.message = { type: 'success', text: 'Producto creado correctamente.' };
    res.redirect('/productos');
  } catch (err) {
    next(err);
  }
}

async function editForm(req, res, next) {
  try {
    const product = await productModel.getById(req.params.id);
    if (!product) return res.status(404).render('404', { title: 'Producto no encontrado' });
    res.render('products/form', {
      title: 'Editar producto',
      product,
      action: `/productos/${product.id}?_method=PUT`,
      errors: []
    });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  const errors = validationResult(req);
  const product = { ...req.body, id: req.params.id };
  if (!errors.isEmpty()) {
    return res.status(422).render('products/form', {
      title: 'Editar producto',
      product,
      action: `/productos/${req.params.id}?_method=PUT`,
      errors: errors.array()
    });
  }

  try {
    const updated = await productModel.update(req.params.id, product);
    if (!updated) return res.status(404).render('404', { title: 'Producto no encontrado' });
    req.session.message = { type: 'success', text: 'Producto actualizado correctamente.' };
    res.redirect('/productos');
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await productModel.remove(req.params.id);
    req.session.message = { type: 'success', text: 'Producto eliminado.' };
    res.redirect('/productos');
  } catch (err) {
    next(err);
  }
}

module.exports = { list, listJson, newForm, create, editForm, update, remove };
