const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const tripCtrl = require('../controllers/trip.controller');


const router = express.Router();
module.exports = router;

//Authenticate for Acccess
//router.use(passport.authenticate('jwt', { session: false }))

router.get('/', asyncHandler(getAll));
router.route('/create').post(asyncHandler(insert));
router.get('/:id',asyncHandler(getTrip));

async function getAll(req,res){
  let trips = await tripCtrl.allTrips(req,res);
  res.json(trips);
}

async function insert(req, res) {
  let trip = await tripCtrl.insert(req.body);
  res.json(trip);
}

async function getTrip(req,res, next){
  let singleTrip = await tripCtrl.getTrip(req, res, next);
  res.json(singleTrip);
}


