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

async function allWayPoints(req, res, next) {
  var queryParams = {
    owner_id: String(req.user._id),
    trip_id: req.params.id //String(req.route.params.id)
  };
  console.info("Fetching Waypoints: ",  queryParams);

  return await WayPoint.find(queryParams, function (err, waypoints) {
    if (err){
      console.info("Error Fetching WPs", err);
      return next(err);
    }
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

