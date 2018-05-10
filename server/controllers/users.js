const User = require('../models/user');
var jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');


const signToken = (payload) => {
  return jwt.sign(
    payload,
    JWT_SECRET, 
    {
      expiresIn: '2d',
      issuer: 'Archipelago'
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
    const result = await newUser.save();
    if(result.err) {
      res.sendStatus(400);
    }


    // Create JWT token
    const payload = ({id : newUser._id, role: newUser.role });
    const token = signToken(payload);
    res.status(200).json({ token });
  },

  login: async (req, res, next) => {
    const { _id, role } = req.user;
    const payload = ({ _id, role });
    const token = signToken(payload);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ token });
  },

  protected: (req, res, next) => {
    res.status(200).json({ message: 'You can now acces the protected area'})
  }


}