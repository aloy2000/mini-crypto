"use strict";

var mongoose = require('mongoose');

var _require = require('validator'),
    isEmail = _require.isEmail;

var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 55,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    max: 1000,
    minLength: 6
  },
  profile: {
    type: String,
    "default": "./upload/profil/default-user.png"
  },
  biography: {
    type: String,
    max: 10332
  },
  followers: {
    type: [String]
  },
  following: {
    type: [String]
  },
  likes: {
    types: [String]
  }
}, {
  timestamps: true
});
UserSchema.pre("save", function _callee(next) {
  var salt;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bcrypt.genSalt());

        case 2:
          salt = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, salt));

        case 5:
          this.password = _context.sent;
          next();

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});
var userModel = mongoose.model('user', UserSchema);
module.exports = userModel;