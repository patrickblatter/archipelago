const Boat = require('../models/boat');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

module.exports = {

  getAll: async (req, res, next) => {
    const boats = await Boat.find({});
    
    if (boats.length > 0) {
      res.status(200).json({ boats });
    } else {
      res.status(200).json({ boats: 'No Boats found'});
    }
  },

  addBoat: async (req, res, next) => {
    const { 
      title, 
      description,
      pricePerDay,
    } = req.body;


    const newBoat = new Boat({
      title,
      description,
      pricePerDay,
      userId: req.user._id
    });

    const result = await newBoat.save();
    if(result.err) {
      //failed
      console.log(result);
      return res.sendStatus(400);
    }
    
    //success
    res.status(201).json({ boat: newBoat });
  },

  getBoat: async (req, res, next) => {
    const boat = await Boat.findById(req.params._id);
    if (!boat) {
      return res.status(404).json({ message: 'Boat not found'});
    }
    res.status(200).json({ boat });
  },

  deleteBoat: async (req, res, next) => {
    // Check if param is vlaid ObjectID
    if (!ObjectId.isValid(req.params._id)) {
      return res.sendStatus(400);
    }

    // check if id === userid
    const boat = await Boat.findById(req.params._id);
    if(!boat){
      return res.status(404).json({ message: 'No boat found'});
    }

    // Check if user making the request is the boat Owner
    if(!req.user._id.equals(boat.userId)) {
      return res.sendStatus(403);
    }

    await Boat.findByIdAndRemove(req.params._id);
    res.status(200).json({ status: 'Boat deleted'});
  },

  updateBoat: async(req, res, next) => {
    // Check if param is vlaid ObjectID
    if (!ObjectId.isValid(req.params._id)) {
      return res.sendStatus(400);
    }

    //  Check if boat exists
    const boat = await Boat.findById(req.params._id);
    if(!boat){
      return res.status(404).json({ message: 'No boat found'});
    }

    // Check if user making the request is the boat Owner
    // test
    if(!req.user._id.equals(boat.userId)) {
      return res.sendStatus(403);
    }

    const updateQuery = {};
    if (req.body.title) updateQuery.title = req.body.title;
    if (req.body.description) updateQuery.description = req.body.description;
    if (req.body.pricePerDay) updateQuery.pricePerDay = req.body.pricePerDay;
    if (req.body.images) updateQuery.images = req.body.images;

    const result = await Boat.findByIdAndUpdate( boat._id, { $set: updateQuery });
    res.status(200).json({ status: 'Boat updated'});


    



    

  }



};