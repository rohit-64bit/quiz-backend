const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchUser = require('../middleware/fetchUser')


require('dotenv').config()
const env = process.env;

jwtSecret = env.JWT_SECRET;


// ROUTE 1: create a user using : POST '/api/auth/user/createuser' Doesn't require auth

router.post('/createuser', [
    body('email', 'Enter a valid e-mail').isEmail(),
    body('name', 'Enter a valid Name').isLength({ min: 5 }),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    body('contact', 'Enter valid contact').isNumeric(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        user = await User.create({
            email: req.body.email,
            name: req.body.name,
            contact: req.body.contact,
            dob: req.body.dob,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, jwtSecret)

        // res.json(user)
        success = true;
        res.json({ success, authtoken })
    } catch(errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2 : Authenticate a user using : POST '/api/auth/user/authuser' Require auth

router.post('/authuser', [
    body('email', 'Enter a valid e-mail').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, jwtSecret)

        success = true;
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3 : Authenticate a user using : POST '/api/auth/user/getuser' Require auth
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userID = req.user.id
        const user = await User.findById(userID).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.put('/update/:id', fetchUser, async (req, res) => {
    console.log(req.body);
    console.log('ID',req.params.id);
    const { name, dob, contact } = req.body;
    
    try {
        // Create a new object
        const newUser = {};
        if (name) { newUser.name = name };

        // const salt = await bcrypt.genSalt(10)
        // const secPass = await bcrypt.hash(password, salt);

        // if (secPass) { newUser.password = secPass };
        if (dob) { newUser.dob = dob };
        if (contact) { newUser.contact = contact };

        // Find the category to be updated and update it
        let user = await User.findById(req.params.id);
        if (!user) { return res.status(404).send("Not Found") }



        user = await User.findByIdAndUpdate(req.params.id, { $set: newUser }, { new: true })
        res.json({ newUser });


        console.log("Updated Profile Successfully");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router