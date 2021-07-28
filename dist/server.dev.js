"use strict";

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var postRoute = require('./routes/post.route');

var userRoute = require('./routes/user.route');

require('./config/db');

require('dotenv').config({
  path: './config/.env'
});

var port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); //routes

app.use('/api/post', postRoute);
app.use('/api/user', userRoute);
app.listen(port, function () {
  console.log("Server running or port ".concat(port));
});