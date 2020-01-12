const mongoose = require('mongoose');

const PulseRateSchema = new mongoose.Schema({
  time : { type : Date, default: Date.now },
  pulseRate: {
    type: Number
  }
});

const BloodPressureSchema = new mongoose.Schema({
  time : { type : Date, default: Date.now },
  bloodPressure: {
    type: Number
  }
});

const BodyTempSchema = new mongoose.Schema({
  time : { type : Date, default: Date.now },
  bodyTemp: {
    type: Number
  }
});

const RespRateSchema = new mongoose.Schema({
  time : { type : Date, default: Date.now },
  respRate: {
    type: Number
  }
});

const TasksSchema = new mongoose.Schema({
  time : { type : Date, default: Date.now },
  task: {
    type: String
  }
});

const PrescriptionSchema = new mongoose.Schema({
  time : { type : Date, default: Date.now },
  prescription: {
    type: String
  }
});

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
  pulseRate: PulseRateSchema,
  bloodPressure: BloodPressureSchema,
  bodyTemp:BodyTempSchema,
  respirationRate:RespRateSchema,
  tasks:TasksSchema,
  prescription:PrescriptionSchema
});

module.exports = mongoose.model('Patient', PatientSchema);