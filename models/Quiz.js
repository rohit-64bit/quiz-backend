const mongoose = require("mongoose")
const { Schema } = mongoose;

const QuizSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId
    },
    level: {
        type: mongoose.Schema.Types.ObjectId
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