const mongoose = require('mongoose');
require('../models/New')
const New = mongoose.model('New');

// JSON response utility function
const respond = function (res, status, content) {
  res.status(status)
  res.json(content)
}

async function createNew(req, res) {
  try {
    const _new = new New(req.body);
    await _new.save();
    respond(res, 201, { _new });
  } catch (e) {
    respond(res, 409, { error: e.message });
    console.log('An error :', e)
  }
}

async function deleteNew(req, res) {
  try {
    const _new = await New.findByIdAndRemove(req.params.id);
    respond(res, 204, {})
  } catch (error) {
    console.log('error');
  }
}

async function getNews(req, res) {
  try {
    const news = await New.find().sort({created:-1}).populate({ path: "author", select: 'firstName lastName' });
    respond(res, 200, { news });
  } catch (e) {
    console.log('An error :', e)
    //this will eventually be handled by your error handling middleware
    next(e)
  }
}

async function updateNewById(req, res) {
  try {
    const _new = await New.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).exec()
    respond(res, 200, { _new })
  } catch (e) {
    console.log('An error ocurred:', e)
    next(e)
  }
}


async function getNewById(req, res) {
  try {
    const _new = await New.findById(req.params.id).populate({ path: "author" });
    respond(res, 200, { _new });
  } catch (e) {
    console.log('An error :', e)
    //this will eventually be handled by your error handling middleware
    next(e)
  }
}

module.exports = { createNew, getNewById, getNews, deleteNew, updateNewById }