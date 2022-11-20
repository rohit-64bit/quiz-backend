const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Instructor = require("../models/Instructor")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchInstructor = require('../middleware/fetchInstructor')


require('dotenv').config()
const env = process.env;

jwtSecret = env.JWT_SECRET_ADMIN;


// ROUTE 1: create a Instructor using : POST '/api/auth/instructor/createinstructor' Doesn't require auth

router.post('/createinstructor', [
    body('email', 'Enter a valid e-mail').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let instructor = await Instructor.findOne({ email: req.body.email });
        if (instructor) {
            return res.status(400).json({ error: "Sorry a Instructor with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new instructor
        instructor = await Instructor.create({
            email: req.body.email,
            password: secPass,
            instructorName: req.body.instructorName,
            phoneNo: req.body.phoneNo,
            address: req.body.address,
            qualification: req.body.qualification,
            categoryAssinged: req.body.categoryAssinged,
        })

        const data = {
            instructor: {
                id: instructor.id
            }
        }
        const authtoken = jwt.sign(data, jwtSecret)

        // res.json(Instructor)
        res.json({ authtoken })
    } catch {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2 : Authenticate a Instructor using : POST '/api/auth/instructor/authinstructor' Require auth

router.post('/authinstructor', [
    body('email', 'Enter a valid e-mail').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let instructor = await Instructor.findOne({ email });
        if (!instructor) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const passCompare = await bcrypt.compare(password, instructor.password);
        if (!passCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const data = {
            instructor: {
                id: instructor.id
            }
        }
        const authtoken = jwt.sign(data, jwtSecret)
        res.json({ authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3 : Authenticate a Instructor using : POST '/api/auth/instructor/getinstructor' Require auth
router.post('/getinstructor', fetchInstructor, async (req, res) => {
    try {
        // console.log(req.instructor);
        instructorID = req.instructor.id
        const instructor = await Instructor.findById(instructorID).select("-password")
        res.send(instructor);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router