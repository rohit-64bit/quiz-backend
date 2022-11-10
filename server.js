const express = require('express')
const connectToMongo = require('./db')
require('dotenv').config()

connectToMongo();

const env = process.env;
const app = express();
const port = 1000;

app.use(express.json())

// Auth APIs
app.use('/api/auth/admin', require('./routes/adminAuth'))
app.use('/api/auth/instructor', require('./routes/instructorAuth'))
app.use('/api/auth/user', require('./routes/userAuth'))

// Create APIs
app.use('/api/create/category', require('./routes/createCategory'))
app.use('/api/create/quiz', require('./routes/createQuiz'))



app.get('/', (req, res) => {
  res.send("this will be rendered on browser page")
})

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
})