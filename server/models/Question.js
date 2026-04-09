const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: [true, 'Subject is required'],
            enum: [
                'Computer Science',
                'Mathematics',
                'General Aptitude',
                'Electronics',
                'Electrical Engineering',
                'Mechanical Engineering',
                'Civil Engineering',
                'Chemical Engineering',
            ],
        },
        topic: {
            type: String,
            required: [true, 'Topic is required'],
            trim: true,
        },
        question: {
            type: String,
            required: [true, 'Question text is required'],
            trim: true,
        },
        options: {
            type: [String],
            required: true,
            validate: {
                validator: function (v) {
                    return v.length === 4;
                },
                message: 'Exactly 4 options are required',
            },
        },
        correctAnswer: {
            type: Number, // index 0-3
            required: [true, 'Correct answer index is required'],
            min: 0,
            max: 3,
        },
        explanation: {
            type: String,
            required: [true, 'Explanation is required'],
            trim: true,
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Medium', 'Hard'],
            default: 'Medium',
        },
        year: {
            type: Number,
            default: null,
        },
        tags: {
            type: [String],
            default: [],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
    },
    { timestamps: true }
);

// Index for faster queries
questionSchema.index({ subject: 1, difficulty: 1 });
questionSchema.index({ subject: 1, isActive: 1 });

module.exports = mongoose.model('Question', questionSchema);
