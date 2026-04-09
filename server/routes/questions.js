const express = require('express');
const router = express.Router();
const { getQuestions, getQuizQuestions, getQuestionById, getSubjects } = require('../controllers/questionController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/subjects', getSubjects);
router.get('/quiz', getQuizQuestions);
router.get('/', getQuestions);
router.get('/:id', getQuestionById);

module.exports = router;
