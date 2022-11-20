const jwt = require('jsonwebtoken');
require('dotenv').config()
const env = process.env;

jwtSecret = env.JWT_SECRET_ADMIN;

const fetchInstructor = (req, res, next) => {

    //  get the admin id from jwt token
    let token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        let data = jwt.verify(token, jwtSecret);
        req.instructor = data.instructor;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: "Error in fetch Instructor Middleware" });
    }
    
}

module.exports = fetchInstructor;