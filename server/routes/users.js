var router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');
const { validateBody, schemas } = require('../helpers/validation');
const userController = require('../controllers/users');

router.route('/signup')
  .post(
    validateBody(schemas.authSchema),
    userController.signup
);

router.route('/login')
  .post(
    validateBody(schemas.authSchema),
    passport.authenticate('local', { session: false }),
    userController.login
);

router.route('/protected')
  .get(
    passport.authenticate('jwt', { session: false }),
    userController.protected
);




module.exports = router;