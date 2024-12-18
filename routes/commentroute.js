import express from 'express';
import Comment from '../model/CommentModel.js';
import validateToken from '../middlewares/validateToken.js';
const commentRoute = express.Router();

commentRoute.get('/', async(req, res) => {
    try{
        const comments = await Comment.find({});
        res.json(comments);
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }

})

commentRoute.post('/',validateToken, async(req, res) => {
    try{
        const token = req.token;
        if(!token) {
            return res.status(401).send('Unauthorized');
        }
        if(!req.userId) {
            return res.status(401).send('User no lonnger exists');
        }
        const { content, postId } = req.body;
        if(!content || !postId) {
            return res.status(400).send('All fields are required');
        }
        const comment = new Comment({ content, postId, addedBy: req.userId });
        await comment.save();
        res.send('Comment added successfully');
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
})
commentRoute.put('/:id', validateToken, async(req, res) => {
    try{
        const token = req.token;
        if(!token) {
            return res.status(401).send('Unauthorized');
        }
        if(!req.userId) {
            return res.status(401).send('User no lonnger exists');
        }
        const { content } = req.body;
        if(!content) {
            return res.status(400).send('All fields are required');
        }
        const comment = await Comment.findById(req.params.id);
        if(!comment) {
            return res.status(404).send('Comment not found');
        }
        comment.content = content;
        await comment.save();
        res.send('Comment updated successfully');
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    })

commentRoute.delete('/:id', validateToken, async(req, res) => {
    try{
        const token = req.token;
        if(!token) {
            return res.status(401).send('Unauthorized');
        }
        if(!req.userId) {
            return res.status(401).send('User no lonnger exists');
        }
        const comment = await Comment.findById(req.params.id);
        if(!comment) {
            return res.status(404).send('Comment not found');
        }
        await comment.remove();
        res.send('Comment deleted successfully');
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
}
})

export default commentRoute;