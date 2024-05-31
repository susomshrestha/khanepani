const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.getAll);
router.get('/:id', customerController.getById);
router.post('/add', customerController.add);
router.put('/update/:id', customerController.update);
// middleware to check 
// router.put('/update/:id', [
//   param('id').isInt().toInt(),
//   body('name').notEmpty(),
//   body('phone').isMobilePhone(),
//   body('dharaNo').isNumeric(),
//   body('dob').isISO8601(),
//   async (req, res, next) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//           return res.status(400).json({ errors: errors.array() });
//       }
//       next();
//   },
//   customerController.update
// ]);
router.delete('/remove/:id', customerController.remove);

module.exports = router;
