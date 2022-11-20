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


router.delete('/delete/:id', fetchAdmin , async (req, res) => {
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
    console.log(req.body);
    console.log('ID',req.params.id);
    const { name, contact,email,address,qualificfation,category } = req.body;
    
    try {
        // Create a new object
        const newInstructor = {};
        if (name) { newInstructor.name = name };
        if (contact) { newInstructor.contact = contact };
        if (email) { newInstructor.email = email };
        if (address) { newInstructor.address = address };
        if (qualificfation) { newInstructor.qualificfation = qualificfation };
        if (category) { newInstructor.category = category };

        // Find the category to be updated and update it
        let instructor = await Instructor.findById(req.params.id);
        if (!instructor) { return res.status(404).send("Not Found") }


        instructor = await Instructor.findByIdAndUpdate(req.params.id, { $set: newInstructor }, { new: true })
        res.json({ newInstructor });


        console.log("Updated Instructor Successfully");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router