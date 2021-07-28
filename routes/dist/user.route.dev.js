"use strict";

var Router = require('express').Router();

var authController = require('../controllers/auth.controller');

var userController = require('../controllers/user.controller');

Router.post('/register', authController.signUp);
Router.get('/', userController.getAllUsers);
Router.get('/:id', userController.userInfo);
module.exports = Router;