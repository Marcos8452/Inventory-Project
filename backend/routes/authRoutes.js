const router = require('express').Router();
const { register, login, setPassword } = require('../controllers/authController');
const { verifyToken, requireAdmin } = require('../middleware/auth');

router.post('/login', login);
router.post('/register', verifyToken, requireAdmin, register);
router.post('/set-password', verifyToken, setPassword);

module.exports = router;

