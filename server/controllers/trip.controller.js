const Joi = require('joi');
const Trip = require('../models/trip.model');
const passport = require('passport');

const tripSchema = Joi.object({
  name: Joi.string().required(),
  owner_id: Joi.string().required(),
})

module.exports = {
  allTrips,
  insert,
  getTrip,
}

async function allTrips(req, res, next) {
  
  var queryParams = {
    owner_id: String(req.user._id),
  };
  
  return await Trip.find(queryParams, function (err, trips) {
    if (err){
      console.info("Err Fetching Trips", err);
      return next(err);
    }
    console.info("fetched trips for ", req.user._id);
    res.json(trips);
  });
}

async function insert(trip) {
  trip = await Joi.validate(trip, tripSchema, { abortEarly: false });
  return await new Trip(trip).save();
}

async function getTrip(req, res, next){
  return await Trip.findById(req.params.id, function (err, post) {
    if (err) {
      return next(err); 
    }
    res.json(post);
  });
}
