const mongoose = require('mongoose');
require('../models/Car')
const Car = mongoose.model('Car')

// JSON response utility function
const respond = function (res, status, content) {
  res.status(status)
  res.json(content)
}

async function createCar(req, res) {
  try {
    const car = new Car(req.body);
    await car.save();
    respond(res, 201, { car });
  } catch (e) {
    if (e.code === 11000)
      respond(res, 409, { error: 'This car is already registered.' });
    console.log('An error :', e)
    next(e)
  }
}

async function deleteCar(req, res) {
  try {
    const car = await Car.findByIdAndRemove(req.params.id);
    respond(res, 204, {})
  } catch (error) {
    console.log('error');
  }
}

async function getCars(req, res) {
  try {
    const cars = await Car.find().populate({path: "owner"});
    respond(res, 200, { cars });
  } catch (e) {
    console.log('An error :', e)
    //this will eventually be handled by your error handling middleware
    next(e)
  }
}

async function updateCarById(req, res) {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).exec()
    respond(res, 200, { car })
  } catch (e) {
    console.log('An error ocurred:', e)
    next(e)
  }
}


async function getCarById(req, res) {
  try {
    const car = await Car.findById(req.params.id).populate({path: "owner"});
    respond(res, 200, { car });
  } catch (e) {
    console.log('An error :', e)
    //this will eventually be handled by your error handling middleware
    next(e)
  }
}

module.exports = { createCar, getCarById, getCars, deleteCar, updateCarById }