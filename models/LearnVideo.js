const mongoose = require("mongoose");
const { Schema } = mongoose;

const VideoSchema = new Schema({

    videoLink: {
        type: String,
        require: true
    },
    imageLink: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category:{
        type:String,
        require:true
    },
    url:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('video', VideoSchema)