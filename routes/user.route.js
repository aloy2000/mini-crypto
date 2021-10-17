const Router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller')
const multer = require('multer')
const upload = multer()

Router.post('/register', authController.signUp);
Router.post('/login', authController.signIn);
Router.post('/logout', authController.logout);

Router.get('/', userController.getAllUsers);
Router.get('/:id', userController.userInfo);
Router.put('/:id', userController.updateUser);
Router.delete('/:id', userController.deleteUser);
Router.patch('/follow/:id', userController.follow);
Router.patch('/unfollow/:id', userController.unFollow);

Router.post('/uploadfile', upload.single('file'), uploadController.uploadProfil )

module.exports = Router;