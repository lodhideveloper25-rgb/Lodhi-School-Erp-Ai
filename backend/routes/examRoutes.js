const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getExams, createExam } = require('../controllers/examController');

router.get('/', protect, getExams);
router.post('/', protect, authorize('teacher', 'admin', 'superadmin'), createExam);

module.exports = router;
