const router = require('express-promise-router')();
const multer  = require('multer')
const Boat = require('../models/boat');
const boatController = require('../controllers/boats')
const passport = require('passport');
const passportConfig = require('../passport');
const { validateBody, validateParams, schemas } = require('../helpers/validation');
const filesController = require('../controllers/files');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const authenticate = (schema) => passport.authenticate(`${schema}`, { session: false });

router.route('/')
  // Get all boats
  .get(
    boatController.getAll
  )
  // Add Boat
  .post(
    authenticate('jwt'),
    upload.array('images', 8),
    validateBody(schemas.addBoatSchema),
    boatController.addBoat,
    filesController.uploadImages
);

// Update Boat

// Routes for Boat with id
router.route('/:_id')
  // Get boat
  .get(
    boatController.getBoat
  )

  // Delete Boat
  .delete(
    passport.authenticate('jwt', { session: false }),
    // validateParams(schemas.deleteBoatSchema),
    boatController.deleteBoat 
  )

  // update boat
  .patch(
    authenticate('jwt'),
    boatController.updateBoat
  )

module.exports = router;