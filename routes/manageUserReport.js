const express = require('express');
const fetchAdmin = require('../middleware/fetchAdmin');
const fetchInstructor = require('../middleware/fetchInstructor');
const fetchUser = require('../middleware/fetchUser');
const UserReport = require('../models/UserReport');
const router = express.Router();


router.post('/create',fetchUser, (req, res) => {
    // update the data if it is available
    
    try {
        const report = UserReport(req.body)
        report.save()
        console.log(req.body)
        res.send(req.body)
    } catch (errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }
})


router.get('/fetch/reports', fetchAdmin, fetchInstructor, async (req, res) => {
    console.log(res.user)
    try {
        const report = await UserReport.find();
        res.json(report);
    } catch (errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }
})


router.get('/fetch/:id', fetchUser, async (req, res) => {

    try {
        const report = await UserReport.find({ userID: req.params.id });
        res.json(report);
    } catch (errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }

})



module.exports = router