const mongoose = require('mongoose');
require('../models/ParkingSpace');
const ParkingSpace = mongoose.model('ParkingSpace');

// JSON response utility function
const respond = function (res, status, content) {
  res.status(status)
  res.json(content)
}

async function createParkingSpace(req, res) {
  try {
    const parkingSpace = new ParkingSpace(req.body);
    await parkingSpace.save();
    respond(res, 201, { parkingSpace });
  } catch (e) {
    if (e.code === 11000)
      respond(res, 409, { message: 'This parking is already in created' });
    console.log('An error :', e)
    next(e)
  }
}

async function deleteParkingSpace(req, res) {
  try {
    const parkingSpace = await ParkingSpace.findByIdAndRemove(req.params.id);
    console.log(parkingSpace);
    respond(res, 204, {})
  } catch (error) {
    console.log('error:', error);
  }
}

async function getParkingSpaces(req, res) {
  try {
    const parkingSpaces = await ParkingSpace.find().populate({path: "assignedUser"});
    respond(res, 200, { parkingSpaces });
  } catch (e) {
    console.log('An error :', e)
    //this will eventually be handled by your error handling middleware
    next(e)
  }
}

async function updateParkingSpaceById(req, res) {
  try {
    const parkingSpace = await ParkingSpace.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).exec()
    respond(res, 200, { parkingSpace })
  } catch (e) {
    console.log('An error ocurred:', e)
    next(e)
  }
}


async function getParkingSpaceById(req, res) {
  try {
    const parkingSpace = await ParkingSpace.findById(req.params.id);
    respond(res, 200, { parkingSpace });
  } catch (e) {
    console.log('An error :', e)
    //this will eventually be handled by your error handling middleware
    next(e)
  }
}

module.exports = { createParkingSpace, getParkingSpaceById, getParkingSpaces, deleteParkingSpace, updateParkingSpaceById }