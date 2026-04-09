const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        questions: [
            {
                question: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Question',
                },
                questionText: String,
                options: [String],
                correctAnswer: Number,
                explanation: String,
                difficulty: String,
                topic: String,
            },
        ],
        selectedAnswers: {
            type: [Number], // -1 = skipped, 0-3 = selected option index
            default: [],
        },
        score: {
            type: Number,
            default: 0,
        },
        totalQuestions: {
            type: Number,
            required: true,
        },
        correctCount: {
            type: Number,
            default: 0,
        },
        incorrectCount: {
            type: Number,
            default: 0,
        },
        skippedCount: {
            type: Number,
            default: 0,
        },
        accuracy: {
            type: Number, // percentage 0-100
            default: 0,
        },
        timeTaken: {
            type: Number, // seconds
            default: 0,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Index for analytics queries
attemptSchema.index({ user: 1, subject: 1, createdAt: -1 });
attemptSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Attempt', attemptSchema);
