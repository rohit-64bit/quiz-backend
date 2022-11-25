const express = require('express');
const fetchAdmin = require('../middleware/fetchAdmin');
const fetchInstructor = require('../middleware/fetchInstructor');
const fetchUser = require('../middleware/fetchUser');
const UserReport = require('../models/UserReport');
const router = express.Router();


router.post('/create', fetchUser, async (req, res) => {

    console.log(req.body);


    // const report = await UserReport.find({ quizLevel: req.body.quizLevel, userID: req.body.user });
    // console.log(report._id);

    // res.json(report._id)
    // if (!report) {
    //     console.log("New Report");
    try {
        const newReport = UserReport(req.body)
        newReport.save()
        res.send(req.body)
    } catch (error) {
        console.log("Error in new report");
        console.log(error.message);
    }
    // } else {
    //     console.log("Report Found");
    //     let { finalScore, correctAns } = req.body;
    //     try {
    //         const newReport = {};
    //         if (finalScore) { newReport.finalScore = finalScore };
    //         if (correctAns) { newReport.correctAns = correctAns };
    //         report = await UserReport.findOneAndUpdate({ quizLevel: req.body.quizLevel, userID: req.body.userID }, { $set: newReport }, { new: true })
    //         res.json({ newReport });
    //     } catch (error) {
    //         console.log(error.message);
    //         res.status(500).send("Internal Server Error");
    //     }
    // }
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