const express = require('express');
const router = express.Router();
const {
  getClasses,
  createClass,
  updateClass,
  deleteClass
} = require('../controllers/classController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getClasses)
  .post(authorize('admin', 'superadmin'), createClass);

router.route('/:id')
  .put(authorize('admin', 'superadmin'), updateClass)
  .delete(authorize('admin', 'superadmin'), deleteClass);

module.exports = router;
