const express = require('express');
const router = express.Router();

const Quiz = require("../models/Quiz")

router.post('/', (req, res) => {
    const quiz = Quiz(req.body)
    quiz.save()

    console.log(req.body)
    res.send(req.body)
})

module.exports = router