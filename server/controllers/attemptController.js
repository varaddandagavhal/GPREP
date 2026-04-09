const Attempt = require('../models/Attempt');
const Question = require('../models/Question');

// @desc    Submit a quiz attempt
// @route   POST /api/attempts
// @access  Private
const submitAttempt = async (req, res, next) => {
    try {
        const { subject, questionIds, selectedAnswers, timeTaken } = req.body;

        if (!subject || !questionIds || !selectedAnswers) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

        // Fetch actual questions from DB
        const questions = await Question.find({ _id: { $in: questionIds } });

        if (questions.length === 0) {
            return res.status(404).json({ success: false, message: 'Questions not found.' });
        }

        // Calculate score
        let correctCount = 0;
        let incorrectCount = 0;
        let skippedCount = 0;

        const questionsSnapshot = questions.map((q, idx) => {
            const selected = selectedAnswers[idx] !== undefined ? selectedAnswers[idx] : -1;

            if (selected === -1) {
                skippedCount++;
            } else if (selected === q.correctAnswer) {
                correctCount++;
            } else {
                incorrectCount++;
            }

            return {
                question: q._id,
                questionText: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation,
                difficulty: q.difficulty,
                topic: q.topic,
            };
        });

        const totalQuestions = questions.length;
        const score = Math.round((correctCount / totalQuestions) * 100);
        const accuracy = totalQuestions > 0 ? parseFloat(((correctCount / totalQuestions) * 100).toFixed(2)) : 0;

        const attempt = await Attempt.create({
            user: req.user._id,
            subject,
            questions: questionsSnapshot,
            selectedAnswers,
            score,
            totalQuestions,
            correctCount,
            incorrectCount,
            skippedCount,
            accuracy,
            timeTaken: timeTaken || 0,
            completed: true,
        });

        res.status(201).json({
            success: true,
            message: 'Quiz submitted successfully.',
            data: attempt,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all attempts for logged in user
// @route   GET /api/attempts
// @access  Private
const getUserAttempts = async (req, res, next) => {
    try {
        const { subject, limit = 10, page = 1 } = req.query;

        const filter = { user: req.user._id, completed: true };
        if (subject) filter.subject = subject;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const attempts = await Attempt.find(filter)
            .select('-questions')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Attempt.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: attempts.length,
            total,
            page: parseInt(page),
            data: attempts,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single attempt with full question details
// @route   GET /api/attempts/:id
// @access  Private
const getAttemptById = async (req, res, next) => {
    try {
        const attempt = await Attempt.findOne({ _id: req.params.id, user: req.user._id });

        if (!attempt) {
            return res.status(404).json({ success: false, message: 'Attempt not found.' });
        }

        res.status(200).json({ success: true, data: attempt });
    } catch (error) {
        next(error);
    }
};

module.exports = { submitAttempt, getUserAttempts, getAttemptById };
