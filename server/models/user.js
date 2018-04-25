const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
  }
});

userSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(this.password, salt);
    this.password = hashedPW;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.checkPassword = async function(plainPassword) {
  return result = await bcrypt.compare(plainPassword, this.password);
}



const User = mongoose.model('user', userSchema);
module.exports = User;