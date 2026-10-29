const Product = require('../models/productModel');
const isUuid = require('../utils/isUuid');

// GET /
async function listProducts(req, res) {
  const products = await Product.findAll();
  res.render('products/index', { title: 'Catálogo', products });
}

// GET /productos/:id
async function showProduct(req, res) {
  const { id } = req.params;
  const product = isUuid(id) ? await Product.findById(id) : null;

  if (!product) {
    return res.status(404).render('errors/404', { title: 'No encontrado' });
  }

  res.render('products/detail', { title: product.name, product });
}

module.exports = { listProducts, showProduct };
