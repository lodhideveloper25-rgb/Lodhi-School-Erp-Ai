const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getAttendanceReport
} = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getAttendanceReport)
  .post(authorize('admin', 'superadmin', 'teacher'), markAttendance);

module.exports = router;
