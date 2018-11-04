const Joi = require('joi');
const Trip = require('../models/trip.model');

const tripSchema = Joi.object({
  name: Joi.string().required(),
})

module.exports = {
  allTrips,
  insert,
  getTrip,
}

async function allTrips(req, res) {
  return await Trip.find(function (err, trips) {
    if (err) return next(err);
    res.json(trips);
  });
}

async function insert(trip) {
  trip = await Joi.validate(trip, tripSchema, { abortEarly: false });
  return await new Trip(trip).save();
}

async function getTrip(req, res){
  return await Trip.findById(req.params.id, function (err, post) {
    if (err) {
      return next(err); 
    }
    res.json(post);
  });
}
