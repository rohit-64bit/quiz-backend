const mongoose = require('mongoose')
const { Schema } = mongoose;

const categorySchema = new Schema({
    categoryName:{
        type: String,
        required:true
    },
    categoryDescription:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("category",categorySchema);