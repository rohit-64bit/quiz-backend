const express = require('express');
const fetchAdmin = require('../middleware/fetchAdmin');
const fetchInstructor = require('../middleware/fetchInstructor');
const fetchUser = require('../middleware/fetchUser');
const UserReport = require('../models/UserReport');
const router = express.Router();


router.post('/create', fetchUser, async (req, res) => {

    console.log("request body is ")
    console.log(req.body);
    const report = await UserReport.find({ quizLevel: req.body.quizLevel, userID: req.body.userID });  // # fix userId attribute name //
    console.log("report object is ")
    console.log(report);
    console.log(report._id);

    // res.json(report._id)   code commented
    if (!report[0]) {
        console.log("New Report");
        try {
            const newReport = UserReport(req.body)
            newReport.save()
            res.send(req.body)
        } catch (error) {
            console.log("Error in new report");
            console.log(error.message);
        }
    } else {
        console.log("Report Found");
        let { finalScore, correctAns } = req.body;
        console.log("final score ")
        console.log(finalScore)
        console.log("correct answer")
        console.log(correctAns)

        try {
            const newReport = {};
            // if (finalScore) { newReport.finalScore = finalScore };
            // if (correctAns) { newReport.correctAns = correctAns };

            newReport.finalScore = finalScore;
            newReport.correctAns = correctAns;

            console.log("final report is ")
            console.log(newReport)
            report1 = await UserReport.findOneAndUpdate({ quizLevel: req.body.quizLevel, userID: req.body.userID }, { $set: newReport }, { new: true })
            res.json({ report1 });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");

        }
    }
})


router.get('/fetch/reports', fetchAdmin, fetchInstructor, async (req, res) => {
    console.log(res.user)
    try {
        const report = await UserReport.find().sort({_id : -1});
        res.json(report);
    } catch (errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }
})


router.get('/fetch/instructor/:id', fetchUser, async (req, res) => {

    try {
        const report = await UserReport.find({ quizCategory: req.params.id }).sort({_id : -1});
        res.json(report);
    } catch (errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }

})

router.get('/fetch/:id', fetchUser, async (req, res) => {

    try {
        const report = await UserReport.find({ userID: req.params.id }).sort({_id : -1});
        res.json(report);
    } catch (errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }

})

router.post('/fetch/reports/levels', fetchUser, async (req, res) => {
    console.log(res.user)
    try {
        const report = await UserReport.find({ quizLevel: req.body.quizLevel, userID: req.body.userID });
        res.json(report[0]);
    } catch (errors) {
        console.error(errors.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports = router