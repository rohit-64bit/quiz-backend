const express = require('express')
const connectToMongo = require('./db')
require('dotenv').config()

connectToMongo();

const env = process.env;
const app = express();
const port = 1000;

app.use(express.json())
// auth api
app.use('/api/auth/user', require('./routes/userAuth'))
app.use('/api/auth/admin', require('./routes/adminAuth'))



app.get('/', (req, res) => {
  res.send("Hello World")
})

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
})