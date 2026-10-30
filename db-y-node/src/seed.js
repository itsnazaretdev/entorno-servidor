const bcrypt = require('bcrypt');
const productModel = require('./models/productModel');
const userModel = require('./models/userModel');

async function ensureAdmin() {
  const name = process.env.ADMIN_NAME || 'Administrador';
  const email = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) {
    throw new Error('ADMIN_PASSWORD debe tener al menos 12 caracteres. Configúralo en .env');
  }
  const exists = await userModel.findByEmail(email);
  if (exists) return;
  const passwordHash = await bcrypt.hash(password, 12);
  await userModel.create({ name, email, passwordHash });
  console.log(`Usuario administrador creado: ${email}`);
}

async function ensureProducts() {
  if (await productModel.hasAny()) return;
  await productModel.createExamples();
  console.log('Productos de ejemplo creados.');
}

module.exports = { ensureAdmin, ensureProducts };
