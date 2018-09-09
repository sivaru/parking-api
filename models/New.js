const mongoose = require('mongoose');
const User = mongoose.model('User');


const newSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: new Date(Date.now()).setHours(0, 0, 0, 0)

  }

});

module.exports = mongoose.model('New', newSchema);