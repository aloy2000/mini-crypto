const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
  pseudoSender: {
    type: String,
    require: true,
  },
  idSender: {
    type: String,
    require: true,
  },
  pseudoDest: {
    type: String,
    require: true,
  },
  idDest: {
    type: String,
    require: true,
  },
  messages: {
    type: [{
      contents: String,
      sender: String,
      dest: String,
      timestamp: Number
    }]
  },
}, {
  timestamp: true
})

const messageModel = mongoose.model('messages', messageSchema)

module.exports = messageModel
