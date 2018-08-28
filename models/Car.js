const mongoose = require('mongoose');
const User = mongoose.model('User');

const carSchema = mongoose.Schema({
  plateNumber: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    minLength: 1,
    maxLength: 6
  },
  brand: {
    type: String,
  },
  color: {
    type: String,
    required: true
  },
  owner:{
   type:  mongoose.Schema.ObjectId,
   ref: 'User'
  }

});

module.exports = mongoose.model('Car', carSchema);