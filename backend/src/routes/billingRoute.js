const express = require('express');
const router = express.Router();

const billingController = require('../controllers/billingController');

router.get('/', billingController.getAll);
router.get('/:customerId/last-bill', billingController.getLastBill);
router.post('/generateBill', billingController.updateMeterAndGenerateBill);

module.exports = router;