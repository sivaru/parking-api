const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
  id:{
    type: String,
    required:true
  },
  name:{
    type: String,
    required: true
  }
});
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
   type:  ownerSchema
  }

});

module.exports = mongoose.model('Car', carSchema);