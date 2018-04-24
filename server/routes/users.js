var router = require('express-promise-router')();
const { validateSignup, schemas } = require('../helpers/validation');
const userController = require('../controllers/users');

router.route('/signup')
  .post(
    validateSignup(schemas.signupSchema),
    userController.signup
);




module.exports = router;