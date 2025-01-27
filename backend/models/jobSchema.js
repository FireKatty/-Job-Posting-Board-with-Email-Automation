const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  experienceLevel: { type: String, enum: ['BEGINNER', 'INTERMEDIATE', 'EXPERT'], required: true },
  endDate: { type: Date, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  candidates: [{ email: String }],
});

module.exports = mongoose.model('Job', jobSchema);