const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from header - 'Bearer token'
            token = req.headers.authorization.split(" ")[1]
            
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            next(); // calls the next piece of middleware
        } catch (err) {
            console.log(err)
            res.status(401);
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized. No token')
    }

})

module.exports = {
    protect
}