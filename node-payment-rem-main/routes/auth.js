const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');
const verifyAuthCredentials = require('../middleware/auth');
const verifyToken = require('../middleware/jwt');

router.post('/signin', verifyAuthCredentials, authController.signin);
router.post('/signup', verifyAuthCredentials, authController.signup);
router.get('/self', verifyToken, authController.self);

module.exports = router;
