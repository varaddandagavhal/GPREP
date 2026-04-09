const express = require('express');
const router = express.Router();
const { submitAttempt, getUserAttempts, getAttemptById } = require('../controllers/attemptController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);


router.post('/', submitAttempt);
router.get('/', getUserAttempts);
router.get('/:id', getAttemptById);

module.exports = router;
