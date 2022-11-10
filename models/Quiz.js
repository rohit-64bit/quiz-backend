const mongoose = require("mongoose")
const { Schema } = mongoose;

const QuizSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        require: true
    },
    level: {
        type: String,
        required: true
    },
    questions: [
        {
            questionText: {
                type: String,
                required: true
            },
            answerOptions: [
                {
                    answerText: {
                        type: String,
                        required: true
                    },
                    isCorrect: {
                        type: Boolean,
                        require: true
                    },
                },
            ]
        },
    ]
});



module.exports = mongoose.model('quiz', QuizSchema)