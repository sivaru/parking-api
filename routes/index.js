const express = require('express');
const router = express.Router();
require('dotenv').config();

const User = require('../models/User')

const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');



/* Authentication routes */

router.post('/login', authController.login);

/* User routes */
router.post('/users', usersController.createUser);
router.get('/users', authController.ensureAuthenticated, usersController.getUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', usersController.updateUserById);



module.exports = router;