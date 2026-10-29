const Product = require('../models/productModel');
const isUuid = require('../utils/isUuid');

// GET /api
async function getAll(req, res) {
  const products = await Product.findAll();
  res.json(products);
}

// GET /api/:id
async function getOne(req, res) {
  const { id } = req.params;
  const product = isUuid(id) ? await Product.findById(id) : null;

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(product);
}

module.exports = { getAll, getOne };
