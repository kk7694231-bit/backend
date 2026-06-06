const express = require('express');
const router = express.Router();
const User1 = require('../schema/user1');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User1({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get all data
router.get('/all', async (req, res) => {
    try {
        const user1 = await User1.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'err.message' });
    } 
});

module.exports = router;