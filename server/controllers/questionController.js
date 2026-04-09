const Question = require('../models/Question');

// @desc    Get all questions (with optional filters)
// @route   GET /api/questions
// @access  Private
const getQuestions = async (req, res, next) => {
    try {
        const { subject, difficulty, limit = 10, page = 1 } = req.query;

        const filter = { isActive: true };
        if (subject) filter.subject = subject;
        if (difficulty) filter.difficulty = difficulty;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const questions = await Question.find(filter)
            .select('-__v')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        const total = await Question.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: questions.length,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            data: questions,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get questions for a quiz (random selection)
// @route   GET /api/questions/quiz
// @access  Private
const getQuizQuestions = async (req, res, next) => {
    try {
        const { subject, count = 10, difficulty } = req.query;

        if (!subject) {
            return res.status(400).json({ success: false, message: 'Subject is required.' });
        }

        const filter = { subject, isActive: true };
        if (difficulty) filter.difficulty = difficulty;

        // Random sample using aggregation
        const questions = await Question.aggregate([
            { $match: filter },
            { $sample: { size: parseInt(count) } },
            {
                $project: {
                    subject: 1, topic: 1, question: 1, options: 1,
                    correctAnswer: 1, explanation: 1, difficulty: 1, year: 1,
                },
            },
        ]);

        if (questions.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No questions found for subject: ${subject}`,
            });
        }

        res.status(200).json({
            success: true,
            count: questions.length,
            data: questions,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single question
// @route   GET /api/questions/:id
// @access  Private
const getQuestionById = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ success: false, message: 'Question not found.' });
        }

        res.status(200).json({ success: true, data: question });
    } catch (error) {
        next(error);
    }
};

// @desc    Get available subjects with question counts
// @route   GET /api/questions/subjects
// @access  Private
const getSubjects = async (req, res, next) => {
    try {
        const subjects = await Question.aggregate([
            { $match: { isActive: true } },
            {
                $group: {
                    _id: '$subject',
                    count: { $sum: 1 },
                    easy: { $sum: { $cond: [{ $eq: ['$difficulty', 'Easy'] }, 1, 0] } },
                    medium: { $sum: { $cond: [{ $eq: ['$difficulty', 'Medium'] }, 1, 0] } },
                    hard: { $sum: { $cond: [{ $eq: ['$difficulty', 'Hard'] }, 1, 0] } },
                },
            },
            { $sort: { count: -1 } },
        ]);

        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        next(error);
    }
};

module.exports = { getQuestions, getQuizQuestions, getQuestionById, getSubjects };
