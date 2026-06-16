const express = require('express');
const router = express.Router();
const { loginUser, getMe, registerSchool } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/login', loginUser);
router.post('/register', registerSchool);
router.get('/me', protect, getMe);

module.exports = router;
