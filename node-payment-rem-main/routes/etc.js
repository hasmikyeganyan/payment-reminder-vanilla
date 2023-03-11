const express = require('express');

const router = express.Router();

const etcController = require('../controllers/etc');

router.get('/', etcController.welcome);

module.exports = router;
