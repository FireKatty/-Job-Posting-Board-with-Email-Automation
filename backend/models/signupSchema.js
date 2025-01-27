const mongoose = require('mongoose');

// Define the schema for the Signup model
const SignupSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    required: true,
  },
});

module.exports = mongoose.model('User', SignupSchema);


