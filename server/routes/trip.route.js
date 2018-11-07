const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const tripCtrl = require('../controllers/trip.controller');


const router = express.Router();
module.exports = router;

//Authenticate for Acccess
router.use(passport.authenticate('jwt', { session: false }))

router.get('/', asyncHandler(getAll));
router.route('/create').post(asyncHandler(insert));
router.get('/:id',asyncHandler(getTrip));

async function getAll(req,res){
  let trips = await tripCtrl.allTrips(req,res);
  trips;
}

async function insert(req, res) {
  var payload={};//= JSON.parse(JSON.stringify(req.body));
  payload.owner_id = String(req.user._id);
  payload.name = req.body.name;
  console.log(payload);
  let trip = await tripCtrl.insert(payload);
  res.json(trip);
}

async function getTrip(req,res, next){
  let singleTrip = await tripCtrl.getTrip(req, res, next);
}


