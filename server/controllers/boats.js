const Boat = require('../models/boat');

module.exports = {



  addBoat: async (req, res, next) => {
    const { 
      title, 
      description,
      pricePerDay,
      user
    }

    const newBoat = new Boat({
      title,
      description,
      pricePerDay,
      user,
      images
    });

    const result = await newBoat.save();
    if(result.err) {
      //failed
      res.sendStatus(400);
    }
    
    //success
    res.status(201).json({ boat: newBoat });
  }



};