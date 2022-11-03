const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    obj = {
        name: "admin",
        num: "verified"
    }
    res.json(obj);
})


module.exports = router