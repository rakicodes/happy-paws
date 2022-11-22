const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User')

// @desc    register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields');
    }

    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400)
        throw new Error('User already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        name,
        email,
        password: hashPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc    authenicate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error('Please add all fields');
    }

    // check for user email
    const user = await User.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    console.log(req.user);
    res.status(200).json(req.user) 

})

// @desc    Get user data
// @route   GET /api/users/:id
// @access  Public
const getUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.params.id)

    if (!_id || !name || !email ) {
        res.status(400)
        throw new Error('User not found')
    }

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

// Generate JWT token - sign a new token w the id + secret which will expire in 30 days
const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
    getUser,
}