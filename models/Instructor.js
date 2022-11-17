const mongoose = require('mongoose')
const { Schema } = mongoose;

const instructorSchema = new Schema({
    instructorName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    categoryAssinged: {
        type: mongoose.Schema.Types.ObjectId
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("instructor", instructorSchema);