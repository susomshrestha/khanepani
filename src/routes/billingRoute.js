const express = require('express');
const router = express.Router();

const billingController = require('../controllers/billingController');

router.get('/', billingController.getAll);
router.get('/test', billingController.test);

module.exports = router;