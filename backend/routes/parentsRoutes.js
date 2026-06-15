const express = require('express');
const router = express.Router();
const { getParents } = require('../controllers/parentsController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/').get(authorize('admin', 'superadmin', 'principal'), getParents);

module.exports = router;
