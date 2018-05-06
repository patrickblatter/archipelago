const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const { MONGO_URI } = require('./config/keys');
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
app.use(passport.initialize());

// Routes
app.use('/users', require('./routes/users'));
app.use('/boats', require('./routes/boats'));
app.use('/rentals', require('./routes/rentals'));
app.use('/files', require('./routes/files'));


module.exports = app;