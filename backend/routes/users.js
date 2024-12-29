// AI-based healthcare dashboard built with the MERN stack. Users can input symptoms, and the app predicts potential health conditions using AI integration. Features include secure user authentication, symptom tracking, and a responsive UI. Tech stack: MongoDB, Express, React, Node.js, AI API integration
// backend/routes/user.js
const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require("../middlewares/verifyToken")
const API_KEY = process.env.HEALTHILY_API_KEY;
const AI_URL = 'https://portal.your.md/v4/chat';
const TOKEN = process.env.HEALTHILY_TOKEN;

//check symptoms and response
router.post('/check-symptoms', verifyToken, async (req, res) => {
    const { symptoms } = req.body;
    try {
        const response = await axios.post(
            `${AI_URL}`,
            { symptoms },
            {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'x-api-key': API_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );
        //  console.log('Request Payload:', { symptoms });
        //  console.log('Request Headers:', {
        //  Authorization: `Bearer ${TOKEN}`,
        // 'x-api-key': API_KEY,});

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Healthily API data:', error);
        res.status(500).json({ message: 'Error fetching symptoms data', error: error.message });
    }
});


   


// Register user with hashed password
router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6}).withMessage('Password must be at least 6 characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        
        await newUser.save();
        res.status(201).json({ message: "User registered" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user", error: error.message })
    }
});

// ... existing login code ...

router.post('/login', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in" });
    }
});
// Example of a protected route
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: "You have accessed a protected route", user: req.user });
});

//home route
router.get("/home",(req,res)=>{
    res.json({message:"Welcome to Health Care Dashboard"})
})
module.exports = router;