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
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

userSchema.post('save', function(user) {
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      throw new Error('Error saving Password');
    }
    user.password = hash;
    user.save();
  });
});

userSchema.methods.checkPassword = async function(plainPassword) {
  return result = await bcrypt.compare(plainPassword, this.password);
}



const User = mongoose.model('user', userSchema);
module.exports = User;