const express = require('express');
const fetchAdmin = require('../middleware/fetchAdmin');
const fetchInstructor = require('../middleware/fetchInstructor');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const Level = require("../models/Level")

// ROUTE 1: add quiz : POST '/api/level/create' Doesn't require auth

router.post('/create', fetchInstructor, (req, res) => {

    try {
        const level = Level(req.body)
        level.save()
        // console.log(req.body)
        res.send(req.body)

    } catch (errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 1: add quiz : GET '/api/level/fetch' Require auth
router.get('/fetch/:category', async (req, res) => {

    // console.log(req.params);
    try {
        var mysort = { name: -1 };
        const level = await Level.find({ category: req.params.category }).sort(mysort)
        res.json(level);
    } catch (errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }

})


// delete levels in a category 
router.delete('/delete/:category', fetchInstructor, async (req, res) => {
    console.log(req.params);
    try {
        let level = await Level.findById(req.params.category);
        if (!level) { return res.status(404).send('Not Found') }

        level = await Level.findByIdAndDelete(req.params.category)

        res.json({ "Success": "Level Deleted" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})



module.exports = router