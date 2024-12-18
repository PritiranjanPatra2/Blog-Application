import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import exp from 'constants';
import authroute from './routes/authroute.js';
import postRoute from './routes/postroute.js';
import commentRoute from './routes/commentroute.js';

const app=express();


dotenv.config();
const port=process.env.PORT || 4949;
const URL=process.env.URL;



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/auth', authroute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

mongoose.connect(URL).then(()=>{
    console.log('Connected to MongoDB');
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })

}).catch((err)=>console.log("Error is ",err));
