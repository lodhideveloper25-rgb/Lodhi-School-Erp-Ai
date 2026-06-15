const express = require('express');
const router = express.Router();
const { getTeachers, createTeacher } = require('../controllers/teacherController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(authorize('admin', 'superadmin', 'principal'), getTeachers)
  .post(authorize('admin', 'superadmin'), createTeacher);

module.exports = router;
