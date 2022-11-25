const mongoose = require('mongoose')
const { Schema } = mongoose;

const userReportSchema = new Schema({

    // all the user details
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    // all the quiz details
    finalScore: {
        type: String,
        require: true
    },
    correctAns: {
        type: String,
        require: true
    },
    quizCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    },
    quizLevel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'level'
    },
    totalQuestion: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    level: {
        type: String,
        require: true
    }

})

module.exports = mongoose.model('userReport', userReportSchema)