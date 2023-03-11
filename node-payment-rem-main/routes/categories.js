const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories');
const verifyToken = require('../middleware/jwt');

router.post('/categories', verifyToken, categoriesController.create);
router.get('/categories', verifyToken, categoriesController.fetch);
router.get('/categories/:id', verifyToken, categoriesController.show);

module.exports = router;
