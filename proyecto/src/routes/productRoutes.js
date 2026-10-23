const { Router } = require('express');
const productController = require('../controllers/productController');

const router = Router();

router.get('/', productController.listProducts);
router.get('/productos/:id', productController.showProduct);

module.exports = router;
