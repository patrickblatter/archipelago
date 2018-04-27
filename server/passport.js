const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { JWT_SECRET } = require('./config/keys');


// Email & Password authentication
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    
    if(!user) {
      return done(null, false);
    }

    // check if password matches
    const correctPassword = await user.checkPassword(password);

    userfromEmail = {
      _id: user._id,
      role: user.role
    }
    if (correctPassword) {
      return done(null, userfromEmail);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  issuer: 'Archipelago'
}, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id);
    if (!user) {
      return done(null, false);
    }

    userfromToken = {
      _id: user._id,
      role: user.role
    }

    return done(null, userfromToken);
  } catch (error) {
    return done(error)
  }
}));

