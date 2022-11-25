const express = require('express');
const fetchAdmin = require('../middleware/fetchAdmin');
const fetchInstructor = require('../middleware/fetchInstructor');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const Quiz = require("../models/Quiz")

// ROUTE 1: add quiz : POST '/api/quiz/create' Doesn't require auth


router.post('/create', fetchInstructor, (req, res) => {
    try {
        const quiz = Quiz(req.body)
        quiz.save()
        console.log(req.body)
        res.send(req.body)
    } catch (errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2 : fetch quiz : GET '/api/quiz/fetch' Require auth
router.get('/fetch/:level', fetchAdmin, fetchUser, fetchInstructor, async (req, res) => {
    try {
        const quiz = await Quiz.find({ level: req.params.level });
        res.json(quiz[0]);
        
    } catch (errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports = router