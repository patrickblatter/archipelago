const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Setup Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('SERVER is running');
})


module.exports = app;