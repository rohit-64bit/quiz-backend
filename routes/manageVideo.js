const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const fetchInstructor = require('../middleware/fetchInstructor');
const fetchUser = require('../middleware/fetchUser');
const Video = require('../models/LearnVideo');
const youtube = require('youtube-metadata-from-url');





// ROUTE 1: create video : POST '/api/video/create' require auth
router.post('/create', fetchInstructor, (req, res) => {
    try {
        const { url, category, categoryID } = req.body;
        youtube.metadata(url).then(async function (json) {
            const video = await Video({
                videoLink: json.html,
                imageLink: json.thumbnail_url,
                title: json.title,
                categoryName: category,
                url: url,
                categoryID: categoryID
            })
            const savedVideo = await video.save()
            res.send(savedVideo)
        }, function (err) {
            console.log(err);
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})

// ROUTE 2: get video : GET '/api/video/fetch' require auth

router.get('/fetch/:category', fetchUser, fetchInstructor, async (req, res) => {
    try {
        const video = await Video.find({ categoryID: req.params.category });
        res.json(video)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})




// ROUTE 3: Update an existing video using: PUT "/api/notes/update". Login required

router.put('/update/:id', fetchInstructor, async (req, res) => {
    const { category, link } = req.body;
    try {
        const newVideo = {};
        if (category) { newVideo.category = category };
        if (link) { newVideo.link = link };

        let video = await Video.findById(req.params.id);
        if (!video) { return res.status(404).send('Not Found') }

        video = await Video.findByIdAndUpdate(req.params.id, { $set: newVideo }, { new: true })

        res.json({ video })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})


// ROUTE 4: Delete an existing video using: DELETE "/api/video/delete". Login required


router.delete('/delete/:id', fetchInstructor, async (req, res) => {
    try {
        let video = await Video.findById(req.params.id);
        if (!video) { return res.status(404).send('Not Found') }

        video = await Video.findByIdAndDelete(req.params.id)

        res.json({ "Success": "Video Deleted" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router