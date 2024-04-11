const express = require('express');
const router = express.Router();

const meterController = require('../controllers/meterController');

router.get('/', meterController.getAll);
router.get('/:id', meterController.getById);
router.get('/:customerId', meterController.getByCustomerId);
router.post('/add', meterController.add);
router.put('/update/:id', meterController.update);
router.delete('/remove/:id', meterController.remove);
router.delete('/generateBill', meterController.updateAndGenerateBill);

module.exports = router;
