const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const tripCtrl = require('../controllers/trip.controller');


const router = express.Router();
module.exports = router;

//Authenticate for Acccess
//router.use(passport.authenticate('jwt', { session: false }))

router.get('/', tripCtrl.allTrips);
router.route('/create').post(asyncHandler(insert));


async function insert(req, res) {
  let trip = await tripCtrl.insert(req.body);
  res.json(trip);
}



