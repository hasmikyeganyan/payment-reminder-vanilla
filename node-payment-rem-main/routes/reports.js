const express = require('express');

const router = express.Router();

const reportsController = require('../controllers/reports');
const verifyToken = require('../middleware/jwt');

router.get('/reports', verifyToken, reportsController.all);
router.get('/reports/categories/:categoryId', verifyToken, reportsController.category);
router.get('/reports/expense', verifyToken, reportsController.mostExpenseCategories);

module.exports = router;
