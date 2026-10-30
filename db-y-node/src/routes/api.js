const router = require('express').Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.listJson);

module.exports = router;
