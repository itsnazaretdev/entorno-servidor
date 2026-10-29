const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

// Devuelve { errors, data }. Si errors está vacío, data está listo para guardar
function validateProduct(body) {
  const errors = [];

  const name = clean(body.name);
  const description = clean(body.description);
  const imageUrl = clean(body.image_url);
  const priceText = clean(body.price).replace(',', '.');
  const stockText = clean(body.stock);

  if (!name) errors.push('El nombre es obligatorio.');
  else if (name.length > 100) errors.push('El nombre no puede superar los 100 caracteres.');

  const price = Number(priceText);
  if (priceText === '' || Number.isNaN(price) || price < 0) {
    errors.push('El precio debe ser un número mayor o igual que 0.');
  }

  const stock = stockText === '' ? 0 : Number(stockText);
  if (!Number.isInteger(stock) || stock < 0) {
    errors.push('El stock debe ser un número entero mayor o igual que 0.');
  }

  if (imageUrl.length > 255) errors.push('La URL de la imagen es demasiado larga.');

  return {
    errors,
    data: {
      name,
      description: description || null,
      price,
      stock,
      image_url: imageUrl || null,
    },
  };
}

function validateCredentials(body, { isRegister = false } = {}) {
  const errors = [];
  const email = clean(body.email).toLowerCase();
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email) errors.push('El email es obligatorio.');
  else if (!EMAIL_REGEX.test(email)) errors.push('El email no tiene un formato válido.');

  if (!password) errors.push('La contraseña es obligatoria.');

  if (isRegister) {
    if (password && password.length < 8) {
      errors.push('La contraseña debe tener al menos 8 caracteres.');
    }
    if (password !== body.confirmPassword) {
      errors.push('Las contraseñas no coinciden.');
    }
  }

  return { errors, data: { email, password } };
}

module.exports = { validateProduct, validateCredentials };
