const Router = require('express').Router();
const postController = require('../controllers/post.controller.js');


Router.get('/getAllPosts', postController.getAllPosts);
Router.post('/createPost', postController.createPost);

module.exports = Router;
