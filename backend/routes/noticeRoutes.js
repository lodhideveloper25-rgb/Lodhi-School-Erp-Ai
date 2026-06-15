const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getNotices, createNotice } = require('../controllers/noticeController');

router.use(protect);

router.route('/')
  .get(getNotices)
  .post(authorize('admin', 'superadmin', 'principal', 'teacher'), createNotice);

module.exports = router;
