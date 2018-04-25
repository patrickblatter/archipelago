const User = require('../models/user');
var jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');


const signToken = (payload) => {
  return jwt.sign(
    payload,
    JWT_SECRET, 
    {
      expiresIn: '2d',
      issuer: payload.email
    }
  )
}

module.exports = {
  signup: async (req, res, next) => { 
    
    const { password, email } = req.body;

    //Check if user exists
    const user = await User.findOne({email});
    if (user) {
      // send back failed status
      return res.sendStatus(409);
    }
    
    const newUser = new User({ email, password });
    await newUser.save();


    // Create JWT token
    const payload = ({email : newUser.email, role: newUser.role });
    const token = signToken(payload);
    res.status(200).json({ token });
  },

  login: async (req, res, next) => {

  }






}