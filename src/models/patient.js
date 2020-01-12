const mongoose = require('mongoose');

const PulseRateSchema = new mongoose.Schema({
  time : { type : Date, default: Date.now },
  pulseRate: {
    type: Number
  }
}, { _id: false });

const BloodPressureSchema = new mongoose.Schema({
  time : { type : Date, default: Date.now },
  bloodPressure: {
    type: Number
  }
}, { _id: false });

const BodyTempSchema = new mongoose.Schema({
  time : { type : Date, default: Date.now },
  bodyTemp: {
    type: Number
  }
} , { _id: false });

const RespRateSchema = new mongoose.Schema({
  time : { type : Date, default: Date.now },
  respRate: {
    type: Number
  }
}, { _id: false });

const TasksSchema = new mongoose.Schema({
  time : { type : Date, default: Date.now },
  taskList: {
    type: Array
  }
}, { _id: false });

const PrescriptionSchema = new mongoose.Schema({
  time : { type : Date, default: Date.now },
  prescription: {
    type: Array
  }
}, { _id: false });

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
  pulseRates: [PulseRateSchema],
  bloodPressures: [BloodPressureSchema],
  bodyTemps:[BodyTempSchema],
  respirationRates:[RespRateSchema],
  tasks:[TasksSchema],
  prescriptions:[PrescriptionSchema]
});

module.exports = mongoose.model('Patient', PatientSchema);
