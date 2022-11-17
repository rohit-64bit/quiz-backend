const mongoose = require('mongoose');

require('dotenv').config()
const env = process.env

const mongoURI = env.mongoURI;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, (err)=>{
        console.log(err);
        console.log("connected to db successfully");
    })

}

module.exports = connectToMongo;