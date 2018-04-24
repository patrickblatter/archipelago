const Joi = require('joi');

module.exports = {

  validateSignup: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if(result.error) {
        return res.sendStatus(400);
      }
      next();
    }
  },

  schemas: {
    signupSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    })
  }
}