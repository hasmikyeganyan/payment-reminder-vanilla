const express = require('express');

const router = express.Router();

const transactionsController = require('../controllers/transactions');
const verifyToken = require('../middleware/jwt');

router.get('/transactions', verifyToken, transactionsController.fetch);
router.post('/transactions', verifyToken, transactionsController.create);
router.delete('/transactions/:id', verifyToken, transactionsController.delete);

module.exports = router;
