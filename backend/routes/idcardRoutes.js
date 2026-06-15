const express = require('express');
const router = express.Router();
const { getIdCards } = require('../controllers/idcardController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getIdCards);

module.exports = router;