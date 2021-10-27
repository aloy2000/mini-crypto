const messageModel = require('../models/message.model')
const ObjectId = require('mongoose').Types.ObjectId

module.exports.getAllMessage = async (req, res) => {
   await messageModel.find()
    .then(data => res.status(200).send(data))
    .catch(e => console.log('error: ' + e))
  
}

module.exports.getOnMessage = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send('id not found: ' + req.params.id)
  }

  messageModel.findById(
    req.params.id,
    (err, data) => {
      if (!err) res.send(data)
      else res.send({
        "error": err
      })
    }
  )
}

module.exports.deleteMessage = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send('id not found: ' + req.params.id)
  }

  messageModel.findByIdAndRemove(
    req.params.id,
    (err, data) => {
      if (!err) res.send(data)
      else console.log("errors delete:", +err)
    }

  )
}

module.exports.createMessage = async (req, res) => {
  const message = await messageModel.create({
    pseudoSender: req.body.pseudoSender,
    idSender: req.body.idSender,
    pseudoDest: req.body.pseudoDest,
    idDest: req.body.idDest,
    messages: {
      contents: req.body.message,
      sender: req.body.idSender,
      dest: req.body.idDest,
      timestamp: new Date().getTime()
    }
  }).then(async (data) => {
    console.log("message created");
    return res.status(201).send({ data })
    await data.save()
  }).catch(e => {
    console.log("message not saved: ", e)
    return res.status(500).send({ e })
  })
}

module.exports.addMessageInExistingConversation = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).send('id not found: ' + req.params.id)

  try {
    return messageModel.findByIdAndUpdate(
      req.params.id, {
      $push: {
        messages: {
          contents: req.body.message,
          sender: req.body.sender,
          dest: req.body.dest,
          timestamp: new Date().getTime()
        },
      },
    }, {
      new: true
    },
      (err, data) => {
        if (!err) return res.send(data);
        else return res.status(400).send(err);
      }
    )
  } catch (e) {
    return res.status(500).send(e);
  }
}
