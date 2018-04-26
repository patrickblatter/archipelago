const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ObjectId } = Schema.Types;
const rentalSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  boatId: {
    type: ObjectId,
    required: true
  },
  rentalStartDate: {
    type: Date,
    required: true
  },
  rentalEndDate: {
    type: Date,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number
  }
});

const Rental = mongoose.model('rental', rentalSchema);

rentalSchema.pre('save', function(next) {
  const start = Date.parse(this.rentalStartDate);
  const end = Date.parse(this.rentalEndDate);
  const oneDay = 1000 * 60 * 60 * 24;
  const difference = (end - start) / oneDay;

  if (difference <= 0){
    // NOT POSSIBLE
    next();
  } else {
    // calculate total price
    this.totalPrice = this.pricePerDay * difference;
    next();
  }
});




module.exports = Rental;