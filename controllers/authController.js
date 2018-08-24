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

async function login(req, res) {
  try{
    const user = await User.findOne({email: req.body.email});

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
  
    if (validPassword){
      var token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 3600 // expires in 24 hours
      });
      respond(res, 200, `Bearer ${token}`);
    }
  }catch(e){
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
  console.clear();
  console.log('date '+moment().toDate())
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ error: 'TokenExpired' });
  }
  // check if the user exists
  User.findById(payload.id, function(err, user){
    if (!user){
      return res.status(401).send({error: 'UserNotFound'});
    } else {
      req.user = payload.sub;
      next();
    }
  });
};

module.exports = {login, ensureAuthenticated};