const express = require('express');
const router = express.Router();
require('dotenv').config();

const usersController = require('../controllers/usersController');
const carsController = require('../controllers/carsController');
const authController = require('../controllers/authController');
const parkingSpacesController = require('../controllers/parkingSpacesController');



/* Authentication routes */

router.post('/login', authController.login);

/* User routes */
router.post('/users',  usersController.createUser);
router.get('/users',authController.ensureAuthenticated, usersController.getUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', usersController.updateUserById);
router.delete('/users/:id',usersController.deleteUser);

/* ParkingSpace routes */
router.post('/parkingSpaces', parkingSpacesController.createParkingSpace);
router.get('/parkingSpaces', parkingSpacesController.getParkingSpaces);
router.get('/parkingSpaces/:id', parkingSpacesController.getParkingSpaceById);
router.put('/parkingSpaces/:id', parkingSpacesController.updateParkingSpaceById);
router.delete('/parkingSpaces/:id', parkingSpacesController.deleteParkingSpace);

/* Car routes */
router.post('/cars', carsController.createCar);
router.get('/cars', carsController.getCars);
router.get('/cars/:id', carsController.getCarById);
router.put('/cars/:id', carsController.updateCarById);
router.delete('/cars/:id', carsController.deleteCar);


module.exports = router;