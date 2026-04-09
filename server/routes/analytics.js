const express = require('express');
const router = express.Router();
const { getSummary, getSubjectwise } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/summary', getSummary);
router.get('/subjectwise', getSubjectwise);

module.exports = router;
