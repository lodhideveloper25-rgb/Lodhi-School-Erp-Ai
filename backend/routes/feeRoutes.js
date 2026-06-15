const express = require('express');
const router = express.Router();
const {
  generateFees,
  payFee,
  getPendingFees,
  getAllFees
} = require('../controllers/feeController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/', authorize('admin', 'superadmin', 'accountant'), getAllFees);
router.get('/pending', authorize('admin', 'superadmin', 'accountant'), getPendingFees);
router.post('/generate', authorize('admin', 'superadmin', 'accountant'), generateFees);
router.put('/pay/:id', authorize('admin', 'superadmin', 'accountant'), payFee);

module.exports = router;
