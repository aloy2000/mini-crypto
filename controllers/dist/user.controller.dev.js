"use strict";

var UserModel = require('../models/user.model');

var ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = function _callee(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(UserModel.find().select('-password'));

        case 2:
          users = _context.sent;
          res.status(200).json({
            users: users
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.userInfo = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
        case "end":
          return _context2.stop();
      }
    }
  });
};