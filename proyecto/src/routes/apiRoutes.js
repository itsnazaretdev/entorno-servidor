const { Router } = require('express');
const apiController = require('../controllers/apiController');

const router = Router();

// Se monta en /api → GET /api y GET /api/:id
router.get('/', apiController.getAll);
router.get('/:id', apiController.getOne);

module.exports = router;
