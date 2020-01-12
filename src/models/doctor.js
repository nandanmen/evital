const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patient: {
    type: String
  }
}, { _id: false });

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  MSP: {
    type: Number
  },
  license: {
    type: Number
  },
  patients:[patientSchema]
});

module.exports = mongoose.model('Doctor', DoctorSchema);