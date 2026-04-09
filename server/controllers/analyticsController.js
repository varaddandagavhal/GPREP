const Attempt = require('../models/Attempt');

// @desc    Get analytics summary for logged in user
// @route   GET /api/analytics/summary
// @access  Private
const getSummary = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const [summary] = await Attempt.aggregate([
            { $match: { user: userId, completed: true } },
            {
                $group: {
                    _id: null,
                    totalAttempts: { $sum: 1 },
                    totalQuestions: { $sum: '$totalQuestions' },
                    totalCorrect: { $sum: '$correctCount' },
                    totalIncorrect: { $sum: '$incorrectCount' },
                    totalSkipped: { $sum: '$skippedCount' },
                    avgAccuracy: { $avg: '$accuracy' },
                    avgScore: { $avg: '$score' },
                    bestScore: { $max: '$score' },
                    totalTimeTaken: { $sum: '$timeTaken' },
                },
            },
        ]);

        // Recent attempts (last 5)
        const recentAttempts = await Attempt.find({ user: userId, completed: true })
            .select('subject score accuracy totalQuestions correctCount timeTaken createdAt')
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            data: {
                summary: summary
                    ? {
                        totalAttempts: summary.totalAttempts,
                        totalQuestions: summary.totalQuestions,
                        totalCorrect: summary.totalCorrect,
                        totalIncorrect: summary.totalIncorrect,
                        totalSkipped: summary.totalSkipped,
                        avgAccuracy: parseFloat(summary.avgAccuracy.toFixed(2)),
                        avgScore: parseFloat(summary.avgScore.toFixed(2)),
                        bestScore: summary.bestScore,
                        totalTimeTaken: summary.totalTimeTaken,
                    }
                    : null,
                recentAttempts,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get subject-wise analytics
// @route   GET /api/analytics/subjectwise
// @access  Private
const getSubjectwise = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const subjectStats = await Attempt.aggregate([
            { $match: { user: userId, completed: true } },
            {
                $group: {
                    _id: '$subject',
                    attempts: { $sum: 1 },
                    totalQuestions: { $sum: '$totalQuestions' },
                    totalCorrect: { $sum: '$correctCount' },
                    avgAccuracy: { $avg: '$accuracy' },
                    avgScore: { $avg: '$score' },
                    bestScore: { $max: '$score' },
                    lastAttempt: { $max: '$createdAt' },
                },
            },
            {
                $project: {
                    subject: '$_id',
                    attempts: 1,
                    totalQuestions: 1,
                    totalCorrect: 1,
                    avgAccuracy: { $round: ['$avgAccuracy', 2] },
                    avgScore: { $round: ['$avgScore', 2] },
                    bestScore: 1,
                    lastAttempt: 1,
                    _id: 0,
                },
            },
            { $sort: { avgAccuracy: -1 } },
        ]);

        // Score trend (last 10 attempts)
        const scoreTrend = await Attempt.find({ user: userId, completed: true })
            .select('subject score accuracy createdAt')
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            data: {
                subjectStats,
                scoreTrend: scoreTrend.reverse(),
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getSummary, getSubjectwise };
