const express = require('express');
const router = express.Router();
const { getStatus, initWhatsApp, sendMessage } = require('../controllers/whatsappController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.get('/status', getStatus);
router.post('/init', initWhatsApp);
router.post('/send', sendMessage);

module.exports = router;
