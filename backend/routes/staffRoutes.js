const express = require('express');
const router = express.Router();
const { getStaff } = require('../controllers/staffController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(authorize('admin', 'superadmin'), getStaff);

module.exports = router;
