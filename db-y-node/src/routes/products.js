const router = require('express').Router();
const { body } = require('express-validator');
const productsController = require('../controllers/productsController');
const { requireAuth } = require('../middleware/auth');

const validateProduct = [
  body('nombre').trim().isLength({ min: 2, max: 180 }).withMessage('El nombre debe tener entre 2 y 180 caracteres.'),
  body('categoria').trim().isLength({ min: 2, max: 120 }).withMessage('La categoría debe tener entre 2 y 120 caracteres.'),
  body('descripcion').trim().isLength({ max: 5000 }).withMessage('La descripción no puede superar 5000 caracteres.'),
  body('precio').isFloat({ min: 0 }).withMessage('Introduce un precio válido igual o superior a cero.')
];

router.get('/', productsController.list);
router.get('/nuevo', requireAuth, productsController.newForm);
router.post('/', requireAuth, validateProduct, productsController.create);
router.get('/:id/editar', requireAuth, productsController.editForm);
router.put('/:id', requireAuth, validateProduct, productsController.update);
router.delete('/:id', requireAuth, productsController.remove);

module.exports = router;
