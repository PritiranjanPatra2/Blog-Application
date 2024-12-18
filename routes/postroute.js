import express from 'express';
import Blog from '../model/postModel.js';
import validateToken from '../middlewares/validateToken.js';
const postRoute = express.Router();

postRoute.get('/', async(req, res) => {
    try{
        const posts = await Blog.find({});
        res.json(posts);
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }

})
postRoute.post('/', validateToken,async(req, res) => {
    try{
        const token = req.token;
        if(!token) {
            return res.status(401).send('Unauthorized');
        }
        if(!req.userId) {
            return res.status(401).send('User no lonnger exists');
        }
        const { title, description } = req.body;
        if(!title || !description) {
            return res.status(400).send('All fields are required');
        }
        const post = new Blog({ title, description, addedBy: req.userId });
        await post.save();
        res.status(201).send('Post created successfully');
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
postRoute.get('/:id', async(req, res) => {
    try{
        const post = await Blog.findById(req.params.id);
        if(!post) {
            return res.status(404).send('Post not found');
        }
        res.json(post);
    }catch(error){
        console.log(error);
    }
})
postRoute.put('/:id', validateToken, async(req, res) => {
    try{
        const token = req.token;
        if(!token) {
            return res.status(401).send('Unauthorized');
        }
        if(!req.userId) {
            return res.status(401).send('User no lonnger exists');
        }
        const { title, description } = req.body;
        if(!title || !description) {
            return res.status(400).send('All fields are required');
        }
        const post = await Blog.findById(req.params.id);
        if(!post) {
            return res.status(404).send('Post not found');
        }
        post.title = title;
        post.description = description;
        await post.save();
        res.send('Post updated successfully');
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
postRoute.delete('/:id', validateToken, async(req, res) => {
    try{
        const token = req.token;
        if(!token) {
            return res.status(401).send('Unauthorized');
        }
        if(!req.userId) {
            return res.status(401).send('User no lonnger exists');
        }
        const post = await Blog.findById(req.params.id);
        if(!post) {
            return res.status(404).send('Post not found');
        }
        await post.remove();
        res.send('Post deleted successfully');
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})

export default postRoute;