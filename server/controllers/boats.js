const Boat = require('../models/boat');

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
      user
    } = req.body;

    const newBoat = new Boat({
      title,
      description,
      pricePerDay,
      user
    });

    const result = await newBoat.save();
    if(result.err) {
      //failed
      console.log(result);
      res.sendStatus(400);
    }
    
    //success
    res.status(201).json({ boat: newBoat });
  }



};