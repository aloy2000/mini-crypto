"use strict";

var userModel = require('../models/user.model');

module.exports.signUp = function _callee(req, res) {
  var _req$body, pseudo, email, password, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, pseudo = _req$body.pseudo, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(userModel.create({
            pseudo: pseudo,
            email: email,
            password: password
          }));

        case 4:
          user = _context.sent;
          res.status(201).json({
            user: user._id
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.status(500).send({
            error: _context.t0
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};