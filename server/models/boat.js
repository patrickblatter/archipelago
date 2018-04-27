const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boatSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  images: {
    type: [String]
  }
});


const Boat = mongoose.model('boat', boatSchema);

module.exports = Boat;