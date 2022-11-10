const express = require('express');
const Instructor = require('../models/Instructor');
const router = express.Router();


router.post('/', (req, res) => {
    const instructor = Instructor(req.body)
    instructor.save()


    console.log(req.body)
    res.send(req.body)
})


module.exports = router