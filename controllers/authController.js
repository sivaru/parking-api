const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment = require('moment');


require('../models/User');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');

const respond = function (res, status, content) {
  res.status(status)
  res.json(content)
}

const getCleanUser = (user) => {
  const cleanUser = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    admin: user.admin,
    id: user.id
  }
  return cleanUser;
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const validPassword = bcrypt.compareSync(req.body.password, user.password);
      const cleanUser = getCleanUser(user);

      if (validPassword) {
        var token = jwt.sign(cleanUser, process.env.SECRET, {
          expiresIn: 3600 // expires in 24 hours
        });
        respond(res, 200, token);
      } else {
        respond(res, 401, { error: "Wrong Password or user" })
      }
    } else
      respond(res, 401, { error: "Wrong Password or user" })

  } catch (e) {
    console.log(`Error: ${e}`);
  }
}



function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'TokenMissing' });
  }
  var token = req.headers.authorization.split(' ')[1];
  var payload = null;
  try {
    payload = jwt.verify(token, process.env.SECRET);
  }
  catch (err) {
    return res.status(401).send({ error: "TokenInvalid" });
  }
  console.log('date ' + moment().toDate())
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ error: 'TokenExpired' });
  }
  // check if the user exists
  User.findById(payload.id, function (err, user) {
    if (!user) {
      return res.status(401).send({ error: 'UserNotFound' });
    } else {
      req.user = getCleanUser(user);
      next();
    }
  });
};

module.exports = { login, ensureAuthenticated };