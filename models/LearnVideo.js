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
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'category'
    },
    categoryName: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('video', VideoSchema)