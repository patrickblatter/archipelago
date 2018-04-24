const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    default: 'user'
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const User = mongoose.model('user', userSchema);
module.exports = User;