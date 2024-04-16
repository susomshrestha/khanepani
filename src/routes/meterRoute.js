const express = require('express');
const router = express.Router();

const meterController = require('../controllers/meterController');

router.get('/', meterController.getAll);
router.get('/:id', meterController.getById);
router.get('/customer/:customerId', meterController.getByCustomerId);
router.post('/add', meterController.add);
router.put('/update/:id', meterController.update);
router.delete('/remove/:id', meterController.remove);

module.exports = router;
