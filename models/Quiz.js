const mongoose = require("mongoose")
const { Schema } = mongoose;

const QuizSchema = new Schema({

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        require: true
    },
    level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'level',
        require: true
    },
    levelName: {
        type: String,
        require: true
    },
    categoryName: {
        type: String,
        require: true
    },
    questions: [
        {
            questionText: {
                type: String,
            },
            answerOptions: [
                {
                    answerText: {
                        type: String,
                    },
                    isCorrect: {
                        type: String,
                    },
                },
            ]
        },
    ]
});



module.exports = mongoose.model('quiz', QuizSchema)