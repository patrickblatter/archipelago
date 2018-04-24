const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/keys');
const usersRoute = require('./routes/users');
const app = express();

// Connect to mongo
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .on('error', () => console.log('Error connecting to the local DB'))
  .once('open', () => console.log('Connected to local DB'));

// Setup Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use('/users', usersRoute);


module.exports = app;