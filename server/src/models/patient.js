const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  gender:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  weight:{
    type: Number
  },
  height:{
    type: Number
  },
  insuranceNo:{
    type: Number,
    required: true
  },
  pulseRate:{
    type: Array
  },
  bloodPressure:{
    type: Array
  },
  bodyTemp:{
    type: Array
  },
  respirationRate:{
    type: Array
  },
  tasks:{
    type: Array
  },
  prescription:{
    type: Array
  }
});

module.exports = mongoose.model('Patient', PatientSchema);