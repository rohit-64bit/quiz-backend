const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
require('dotenv').config()
const env = process.env;



connectToMongo();

const app = express();
const port = 1000;

app.use(cors({ origin: "http://127.0.0.1:5173", }))

app.use(express.json())

// Auth APIs handles CRUD for all the level users
app.use('/api/auth/admin', require('./routes/adminAuth'))
app.use('/api/auth/instructor', require('./routes/instructorAuth'))
app.use('/api/auth/user', require('./routes/userAuth'))

// Create APIs used for CRUD of quiz, videos, categories
app.use('/api/category', require('./routes/manageCategory'))
app.use('/api/quiz', require('./routes/manageQuiz'))
app.use('/api/video',require('./routes/manageVideo'))
app.use('/api/level',require('./routes/manageLevels'))
app.use('/api/userreport',require('./routes/manageUserReport'))


// manage APIs mainly used to fetch data
app.use('/api/user', require('./routes/manageUsers'))
app.use('/api/instructor', require('./routes/manageInstructor'))


app.get('/', (req, res) => {
  res.send("this will be rendered on browser page")
})

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
})