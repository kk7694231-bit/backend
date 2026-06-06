const express = require('express');
const router = express.Router();
const User = require('../schema/user');
// const bcrypt = require('bcrypt');
const auth = require('../auth/middleware');
const Task = require('../schema/Task');
// register 
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// register - post 

// router.post('/register', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();
//         res.status(201).json({ message: 'User created', user: newUser });
//     } catch (error) {
//         console.error('Error creating user', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// get all data
router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'err.message' });
    } 
});

// get user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'err.message' });
    }   
});

// update user 
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'err.message' });
    }   
});

// delete user
router.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'err.message' });
    }
});

// update user
router.put('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'err.message' });
    }
});

// login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const token = user.generateAuthToken();
                return res.status(200).json({ message: 'Login successful', user, token });
            }
            else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ message: 'No user found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }   
});

module.exports = router;