const postModel = require('../models/post.model');

module.exports.getAllPosts = async (req, res) => {
    await postModel.find(
        (err, data) => {
            if(!err) res.send(data);
            else console.log("Error to get all posts");
        }
    )
}

module.exports.createPost = async (req, res) => {

    try {
        const {posterId, message,likers} = req.body;
        const newPost =  await  postModel.create({
            posterId: posterId,
            message: message,
            likers: likers
        });
        res.status(201).send({post: newPost._id});

    } catch (e) {
        return res.status(500).send({error:e});
    }
    
}