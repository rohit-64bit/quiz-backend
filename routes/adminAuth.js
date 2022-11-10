const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
    obj = {
        name: "admin",
        num: "verified"
    }
    res.json(obj);
})


module.exports = router