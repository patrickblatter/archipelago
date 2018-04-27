const router = require('express-promise-router')();
const rentalsController = require('../controllers/rentals');
const passport = require('passport');
const passportConfig = require('../passport');
const { validateBody, schemas } = require('../helpers/validation');

const options = { session: false };
router.route('/')
  // Show all rentals for admin 
  .get(
    passport.authenticate('jwt', options),
    rentalsController.getAll
  )
  .post(
    passport.authenticate('jwt', options),
    validateBody(schemas.createRentalSchema),
    rentalsController.createRental
);

router.route('/:_id')
  .get(
    passport.authenticate('jwt', options),
    rentalsController.getRental
  )

  .delete(
    passport.authenticate('jwt', options),
    rentalsController.deleteRental
  )



module.exports = router;