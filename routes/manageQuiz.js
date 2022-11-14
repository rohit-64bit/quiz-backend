const express = require('express');
const router = express.Router();
const Quiz = require("../models/Quiz")

// ROUTE 1: add quiz : POST '/api/quiz/create' Doesn't require auth

router.post('/create', (req, res) => {
    const quiz = Quiz(req.body)
    quiz.save()

    console.log(req.body)
    res.send(req.body)
})

module.exports = router