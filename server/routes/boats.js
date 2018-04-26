const router = require('express-promise-router');
const Boat = require('../models/boat');
const boatController = require('../controllers/boats')
const passport = require('passport');
const passportConfig = require('../passport');
const { validateBody, schemas } = require('../helpers/validation');

const authenticate = (schema) => passport.authenticate(`${schema}`, { session: false })

// Add Boat
router.use('/')
  .post(
    authenticate('jwt'),
    validateBody(schemas.addBoatSchema),
    boatController.addBoat
);



// Update Boat

// Delete Boat