const mongoose = require('mongoose');
const User = mongoose.model('User');

const parkingSpaceSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    maxlength: 1,
	uppercase: true,
    required: true
  },
  isAssigned:{
    type: Boolean,
    required: true,
    default: false
  },
  assignedUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
	default: null
  },
  freePeriod:{
	type: Boolean,
	required: true,
	default: false
  }
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
