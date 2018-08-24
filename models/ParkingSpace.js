const mongoose = require('mongoose');

const parkingSpaceSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    maxlength: 1,
    required: true
  },
  isAssigned:{
    type: Boolean,
    required: true,
    default: false
  },
  assignedUser: {
    type: String,
  },
  freePeriodStart:{
    type: Date,
    default: null
  },
  freePeriodEnd:{
    type: Date,
    default: null
  }
});

parkingSpaceSchema.index({ number: 1,section: 1 }, { unique: true });

module.exports = mongoose.model('ParkingSpace', parkingSpaceSchema);
