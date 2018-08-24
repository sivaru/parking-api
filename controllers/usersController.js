const mongoose = require('mongoose');
require('../models/User')
const User = mongoose.model('User')

// JSON response utility function
const respond = function (res, status, content) {
  res.status(status)
  res.json(content)
}

async function createUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    respond(res, 201, { user });
  } catch (e) {
    if (e.code === 11000)
      respond(res, 409, { message: 'This email is already in use' });
    console.log('An error :', e)
    next(e)
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    respond(res, 204, {})
  } catch (error) {
    console.log('error');
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find();
    respond(res, 200, { users });
  } catch (e) {
    console.log('An error :', e)
    //this will eventually be handled by your error handling middleware
    next(e)
  }
}

async function updateUserById(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).exec()
    respond(res, 200, { job })
  } catch (e) {
    console.log('An error ocurred:', e)
    next(e)
  }
}


async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    respond(res, 200, { job });
  } catch (e) {
    console.log('An error :', e)
    //this will eventually be handled by your error handling middleware
    next(e)
  }
}

module.exports = { createUser, getUserById, getUsers, deleteUser, updateUserById }