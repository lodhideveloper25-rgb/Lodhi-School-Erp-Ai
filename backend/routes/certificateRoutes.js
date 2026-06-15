const express = require('express');
const router = express.Router();
const { getCertificates } = require('../controllers/certificateController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getCertificates);

module.exports = router;