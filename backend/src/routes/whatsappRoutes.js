const express = require('express');
const { sendResultOnWhatsApp, sendSmartMandiResultOnWhatsApp } = require('../controllers/whatsappController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/send-result', protect, sendResultOnWhatsApp);
router.post('/send-smart-mandi', protect, sendSmartMandiResultOnWhatsApp);

module.exports = router;
