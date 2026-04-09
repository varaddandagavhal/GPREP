const Question = require('../models/Question');
const User = require('../models/User');
const Attempt = require('../models/Attempt');

// @desc    Add a new question
// @route   POST /api/admin/questions
// @access  Admin
const addQuestion = async (req, res, next) => {
    try {
        const { subject, topic, question, options, correctAnswer, explanation, difficulty, year, tags } = req.body;

        if (!subject || !topic || !question || !options || correctAnswer === undefined || !explanation) {
            return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
        }

        const newQuestion = await Question.create({
            subject, topic, question, options,
            correctAnswer: parseInt(correctAnswer),
            explanation, difficulty, year, tags,
            createdBy: req.user._id,
        });

        res.status(201).json({ success: true, message: 'Question added successfully.', data: newQuestion });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a question
// @route   PUT /api/admin/questions/:id
// @access  Admin
const updateQuestion = async (req, res, next) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!question) {
            return res.status(404).json({ success: false, message: 'Question not found.' });
        }

        res.status(200).json({ success: true, message: 'Question updated.', data: question });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a question (soft delete)
// @route   DELETE /api/admin/questions/:id
// @access  Admin
const deleteQuestion = async (req, res, next) => {
    try {
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!question) {
            return res.status(404).json({ success: false, message: 'Question not found.' });
        }

        res.status(200).json({ success: true, message: 'Question deleted (soft).' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        next(error);
    }
};

// @desc    Get platform stats
// @route   GET /api/admin/stats
// @access  Admin
const getPlatformStats = async (req, res, next) => {
    try {
        const [totalUsers, totalQuestions, totalAttempts] = await Promise.all([
            User.countDocuments({ role: 'user' }),
            Question.countDocuments({ isActive: true }),
            Attempt.countDocuments({ completed: true }),
        ]);

        const subjectBreakdown = await Question.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$subject', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        res.status(200).json({
            success: true,
            data: { totalUsers, totalQuestions, totalAttempts, subjectBreakdown },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { addQuestion, updateQuestion, deleteQuestion, getAllUsers, getPlatformStats };
