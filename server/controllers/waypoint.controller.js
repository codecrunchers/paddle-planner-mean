const Joi = require('joi');
const WayPoint = require('../models/waypoint.model');

const wayPointSchema = Joi.object({
  owner_id: Joi.string().required(),
  trip_id: Joi.string().required(),
  lat: Joi.string().required(),
  lon: Joi.string().required(),
  speed: Joi.string().required(),
})

module.exports = {
  allWayPoints,
  insert,
  getWayPoint,
}

async function allWayPoints(req, res) {
  return await WayPoint.find(function (err, waypoints) {
    if (err) return next(err);
    res.json(waypoints);
  });
}

async function insert(waypoint) {
  waypoint = await Joi.validate(waypoint, wayPointSchema, { abortEarly: false });
  return await new WayPoint(waypoint).save();
}

async function getWayPoint(req, res, next){
  return await WayPoint.findById(req.params.id, function (err, post) {
    if (err) {
      return next(err); 
    }
    res.json(post);
  });
}

