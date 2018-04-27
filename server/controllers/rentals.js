

const Rental = require('../models/rental');
const { ObjectId } = require('mongoose').Types

module.exports = {

  createRental: async (req, res, next) => {
    const {
      boatId,
      pricePerDay,
      rentalStartDate,
      rentalEndDate
    } = req.body;

    const newRental = new Rental({
      userId : req.user._id,
      boatId,
      pricePerDay,
      rentalStartDate,
      rentalEndDate
    });

    const result = await newRental.save();
    if(result.err) {
      console.log(result);
      //failed
      return res.sendStatus(400);
    }

    //success
    res.status(201).json({ message: 'Rental created' });
  },

  getAll: async (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403);
    }

    const rentals = await Rental.find({});

    res.status(200).json(rentals);
  },

  getRental: async (req, res, next) => {
     // Check if param is vlaid ObjectID
     if (!ObjectId.isValid(req.params._id)) {
      return res.sendStatus(400);
    }

    // check if id === userid
    const rental = await Rental.findById(req.params._id);
    if(!rental){
      return res.status(404).json({ message: 'No rental found'});
    }

    // Check if user making the request is the rental Owner
    if(!req.user._id.equals(rental.userId)) {
      return res.sendStatus(403);
    }

    res.status(200).json({ rental });
  },

  deleteRental: async (req, res, next) => {
    // Check if param is vlaid ObjectID
    if (!ObjectId.isValid(req.params._id)) {
      return res.sendStatus(400);
    }

     // check if id === userid
     const rental = await Rental.findById(req.params._id);
     if(!rental){
       return res.status(404).json({ message: 'No rental found'});
     }

     // Check if user making the request is the rental Owner
    if(!req.user._id.equals(rental.userId)) {
      return res.sendStatus(403);
    }

    await Rental.findByIdAndRemove(req.params._id);
    res.status(200).json({ message: 'Rental deleted' });
  }

}