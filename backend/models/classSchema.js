const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  className: String,
  subject: String,
  year: Number,
  studentFees: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
  teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

module.exports = mongoose.model('Class', ClassSchema);
