const express = require('express');
const router = express.Router();
const fetchAdmin = require('../middleware/fetchAdmin');
const fetchInstructor = require('../middleware/fetchInstructor');
const Instructor = require('../models/Instructor');
const Category = require('../models/Category')


// ROUTE 2: get category : GET '/api/instructor/fetch' require auth

router.get('/fetch', fetchAdmin, fetchInstructor, async (req, res) => {
    try {
        const instructor = await Instructor.find().select("-password")
        
        res.json(instructor);
    } catch {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router