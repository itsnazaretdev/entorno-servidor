const { Router } = require('express');
const adminController = require('../controllers/adminController');
const { requireAdmin } = require('../middlewares/auth');

const router = Router();

// Todas las rutas de este router exigen sesión de admin
router.use(requireAdmin);

router.get('/', adminController.dashboard);

// "nuevo" va antes que "/:id" para que no se lea como un id
router.get('/productos/nuevo', adminController.showCreateForm);
router.post('/productos', adminController.create);

router.get('/productos/:id/editar', adminController.showEditForm);
router.put('/productos/:id', adminController.update);
router.delete('/productos/:id', adminController.remove);

module.exports = router;
