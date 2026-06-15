const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getHomework, createHomework } = require('../controllers/homeworkController');

router.get('/', protect, getHomework);
router.post('/', protect, authorize('teacher', 'admin', 'superadmin'), createHomework);

module.exports = router;
