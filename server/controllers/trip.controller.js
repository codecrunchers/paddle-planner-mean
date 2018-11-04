const Joi = require('joi');
const Trip = require('../models/trip.model');

const tripSchema = Joi.object({
  name: Joi.string().required(),
})

module.exports = {
  allTrips,
  insert,
}

async function allTrips(req, res) {
   Trip.find(function (err, trips) {
    if (err) return next(err);
    res.json(trips);
  });
}

async function insert(trip) {
  trip = await Joi.validate(trip, tripSchema, { abortEarly: false });
  return await new Trip(trip).save();
}

