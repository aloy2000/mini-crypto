const messageController = require('../controllers/message.controller')
const Router = require('express').Router()

Router.get('/getAllMessage', messageController.getAllMessage )
Router.patch('/addMessage/:id', messageController.addMessageInExistingConversation)
Router.get('/:id', messageController.getOnMessage)
Router.post('/', messageController.createMessage)
Router.delete('/:id', messageController.deleteMessage)

module.exports = Router
