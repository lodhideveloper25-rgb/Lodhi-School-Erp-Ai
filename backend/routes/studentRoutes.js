const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(authorize('admin', 'superadmin', 'principal', 'teacher', 'receptionist'), getStudents)
  .post(authorize('admin', 'superadmin'), createStudent);

router.route('/:id')
  .get(getStudentById)
  .put(authorize('admin', 'superadmin'), updateStudent)
  .delete(authorize('admin', 'superadmin'), deleteStudent);

module.exports = router;
