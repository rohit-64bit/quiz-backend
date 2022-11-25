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


router.delete('/delete/:id', fetchAdmin, async (req, res) => {
    try {
        // Find the category to be delete and delete it
        let instructor = await Instructor.findById(req.params.id);
        if (!instructor) { return res.status(404).send("Not Found") }


        instructor = await Instructor.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Category has been deleted", instructor: instructor });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// /api/instructor/update

router.put('/update/:id', fetchAdmin, async (req, res) => {

    const { instructorName, phoneNo, email, address, qualification} = req.body;
    console.log('ID', req.params.id);

    try {
        // Create a new object
        const newInstructor = {};
        if (instructorName) { newInstructor.instructorName = instructorName };
        if (phoneNo) { newInstructor.phoneNo = phoneNo };
        if (email) { newInstructor.email = email };
        if (address) { newInstructor.address = address };
        if (qualification) { newInstructor.qualification = qualification };


        // Find the instructor to be updated and update it
        let instructor = await Instructor.findById(req.params.id);
        if (!instructor) { return res.status(404).send("Not Found") }


        instructor = await Instructor.findByIdAndUpdate(req.params.id, { $set: newInstructor }, { new: true })
        res.json({ newInstructor });


        console.log({newInstructor});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router