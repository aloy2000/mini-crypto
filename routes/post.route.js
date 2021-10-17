const Router = require('express').Router();
const postController = require('../controllers/post.controller.js');
const multer = require('multer')
const upload = multer()


Router.get('/getAllPosts', postController.getAllPosts);
Router.get('/:id', postController.getPost)
Router.post('/createPost', upload.single('file'), postController.createPost);
Router.delete('/:id', postController.deletePost);
Router.put('/:id', postController.updatePost);
Router.patch('/likepost/:id', postController.likePost)
Router.patch('/dislikepost/:id', postController.disLikePost)
Router.patch('/comment/:id', postController.commentPost)
Router.patch('/comment-edit/:id', postController.commentEditPost)
Router.patch('/comment-delete/:id', postController.commentDeletePost)

module.exports = Router;
