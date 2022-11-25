const mongoose = require('mongoose')
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    isAssinged: {
        type: Boolean,
        default: false,
        require: true
    }
})

module.exports = mongoose.model("category", categorySchema);