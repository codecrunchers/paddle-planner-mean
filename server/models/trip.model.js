const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, {
  versionKey: false
});


module.exports = mongoose.model('Trip', TripSchema);

