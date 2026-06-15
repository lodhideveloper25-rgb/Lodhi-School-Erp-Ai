const express = require('express');
const router = express.Router();
const { predictFeeDefaulters, studentPerformanceAnalysis } = require('../controllers/aiController');
const { protect, authorize } = require('../middleware/auth');

router.route('/fee-defaulters').get(protect, authorize('superadmin', 'admin', 'accountant'), predictFeeDefaulters);
router.route('/performance-analysis/:studentId').get(protect, authorize('superadmin', 'admin', 'teacher', 'principal'), studentPerformanceAnalysis);

module.exports = router;
