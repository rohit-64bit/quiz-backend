const mongoose = require("mongoose")
const { Schema } = mongoose;

const LevelSchema = new Schema({
    name : {
        type :String,
        required :true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required :true,
        ref: 'category'
    }
})

module.exports = mongoose.model('level', LevelSchema)