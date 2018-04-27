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
      userId: req.user
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
    if(req.user !== boat.userId) {
      return res.sendStatus(403);
    }

    await Boat.findByIdAndRemove(req.params._id);
    res.status(200).json({ status: 'Boat deleted'});
  }



};