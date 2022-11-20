const express = require('express');
const router = express.Router();
const fetchAdmin = require('../middleware/fetchAdmin');
const fetchInstructor = require('../middleware/fetchInstructor');
const User = require('../models/User')


// ROUTE 2: get category : GET '/api/user/fetch' require auth

router.get('/fetch',fetchAdmin,fetchInstructor, async (req, res) => {
    try {
        const user = await User.find().select("-password");
        res.json(user);
    } catch(errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/delete/:id',fetchAdmin, async (req, res) => {
    console.log(req.params.id);
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.json(user);
    } catch(errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router