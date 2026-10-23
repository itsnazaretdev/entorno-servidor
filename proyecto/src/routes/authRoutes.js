const { Router } = require('express');
const authController = require('../controllers/authController');
const { redirectIfLoggedIn } = require('../middlewares/auth');

const router = Router();

router.get('/register', redirectIfLoggedIn, authController.showRegister);
router.post('/register', redirectIfLoggedIn, authController.register);

router.get('/login', redirectIfLoggedIn, authController.showLogin);
router.post('/login', redirectIfLoggedIn, authController.login);

router.post('/logout', authController.logout);

module.exports = router;
