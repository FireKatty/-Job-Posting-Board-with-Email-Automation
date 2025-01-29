const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures only one OTP per email at a time
    lowercase: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // TTL: Expires after 5 minutes (300 seconds)
  },
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
