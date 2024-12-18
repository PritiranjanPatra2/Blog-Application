import express from 'express';
import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECERET=process.env.JWT_PRIVATE;
const authroute = express.Router();
authroute.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    
    try {
        if(!name || !email || !password) {
            return res.status(400).send('All fields are required');
        }
        if(await User.findOne({ email })) {
            return res.status(400).send('Email already exists');
        }
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send('User created successfully');

    
    }catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }

    
})
authroute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).send('All fields are required');
    }
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).send('User not found');
        }
        if(user.password !== password) {
            return res.status(400).send('Incorrect password');
        }
       const token = jwt.sign({ userId: user._id , email: user.email},SECERET, { expiresIn: '1d' });
       res.cookie('token', token, { httpOnly: true,secure:false});
       res.status(200).send('Login successful');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }

    
})
authroute.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).send('Logout successful');
})


export default authroute;