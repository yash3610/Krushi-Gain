const express = require('express');
const { analyzeMandi, getAnalysisHistory, getSmartMandiFinderData } = require('../controllers/mandiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/finder', getSmartMandiFinderData);
router.post('/analyze', protect, analyzeMandi);
router.get('/history', protect, getAnalysisHistory);

module.exports = router;
