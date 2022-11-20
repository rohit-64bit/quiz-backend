const express = require('express');
const router = express.Router();
const fetchAdmin = require('../middleware/fetchAdmin');
const fetchInstructor = require('../middleware/fetchInstructor');
const fetchUser = require('../middleware/fetchUser');
const Category = require('../models/Category');

// ROUTE 1: create category : POST '/api/category/create' require auth
router.post('/create', async (req, res) => {

    let category = await Category.findOne({ name: req.body.name });
    if (category) {
        return res.status(400).json({ error: "Sorry a category with this name already exists" });
    }

    try {
        const category = Category(req.body)
        const savedCategory = await category.save()
        res.send(savedCategory)
    } catch (errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }

})


// ROUTE 2: get category : GET '/api/category/fetch' require auth

router.get('/fetch', fetchAdmin, fetchUser, fetchInstructor, async (req, res) => {
    try {
        const category = await Category.find();
        res.json(category);
    } catch {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }

})


// ROUTE 2: get category : GET '/api/category/find/:id' require auth

router.get('/find/:id', fetchInstructor, fetchUser, fetchAdmin, async (req, res) => {
    try {
        const categoryFind = await Category.findById(req.params.id)
        res.json(categoryFind)
    } catch (errors) {
        console.log(errors.message);
        res.status(500).send('Internal Server Error');
    }
})


// ROUTE 3: Update an existing category using: PUT "/api/notes/update". Login required

router.put('/update/:id', fetchAdmin, async (req, res) => {
    const { name, description } = req.body;
    try {
        // Create a newCategory object
        const newCategory = {};
        if (name) { newCategory.name = name };
        if (description) { newCategory.description = description };

        // Find the category to be updated and update it
        let category = await Category.findById(req.params.id);
        if (!category) { return res.status(404).send("Not Found") }


        category = await Category.findByIdAndUpdate(req.params.id, { $set: newCategory }, { new: true })
        res.json({ newCategory });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing category using: DELETE "/api/category/delete". Login required


router.delete('/delete/:id', fetchAdmin, async (req, res) => {
    try {
        // Find the category to be delete and delete it
        let category = await Category.findById(req.params.id);
        if (!category) { return res.status(404).send("Not Found") }


        category = await Category.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Category has been deleted", category: category });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})




module.exports = router