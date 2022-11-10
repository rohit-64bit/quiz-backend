const express = require('express');
const router = express.Router();

const Category = require('../models/Category');

router.post('/', (req, res) => {
    const category = Category(req.body)
    category.save()
    
    console.log(req.body)
    res.send(req.body)
})

module.exports = router