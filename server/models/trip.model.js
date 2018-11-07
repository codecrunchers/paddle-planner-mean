const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },  
  owner_id: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
  }},
  {
    versionKey: false
  }
);


module.exports = mongoose.model('Trip', TripSchema);

