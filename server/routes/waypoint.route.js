const WebSocket = require('ws');
const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const wayPointCtrl = require('../controllers/waypoint.controller');


var connection = new WebSocket('ws://localhost:8081');
connection.onopen = function () {  
};

// Log errors
connection.onerror = function (error) {
  console.error('WebSocket Error ' + error);
};

// Log messages from the server
connection.onmessage = function (m) {
  console.info('CLIENT received', m);
};


const router = express.Router();
module.exports = router;

//Authenticate for Acccess
//router.use(passport.authenticate('jwt', { session: false }))

router.get('/', asyncHandler(getAll));
router.route('/create').post(asyncHandler(insert));

async function getAll(req,res){
  let waypoints = await wayPointCtrl.allWayPoints(req,res);
  res.json(waypoints);

}

async function insert(req, res) {
  let wayPoint = await wayPointCtrl.insert(req.body);
  connection.send('{"collection":"waypoint","count":"1"}');
  res.json(wayPoint);
}

async function getWayPoint(req,res, next){
  let singleWayPoint = await wayPointCtrl.getWayPoint(req, res, next);
  res.json(singleWayPoint);
}



