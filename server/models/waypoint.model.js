const mongoose = require('mongoose');

const WayPointSchema = new mongoose.Schema({
  trip_id: {
    type: String,
    required: true
  },
  owner_id: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  lon: {
    type: String,
    required: true
  },
  speed: {
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


module.exports = mongoose.model('WayPoint', WayPointSchema);

