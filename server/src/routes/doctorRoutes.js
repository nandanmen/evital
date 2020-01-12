const express = require("express");
const DoctorModel = require("../models/doctor");

const initializeDoctorRoutes = (app) => {
  const doctorRouter = express.Router();
  app.use('/doctor', doctorRouter);

  /* post a doctor */
  doctorRouter.post('/', async (req, res) => {
    const doctor = new DoctorModel(req.body);
    try {
      await doctor.save().then((item) => res.send(item));
    } catch (e) {
      console.error(e);
      res.status(500);
      await res.json('Could not create doctor');
    }
  });

  /* get a doctor by id */
  doctorRouter.get('/:id', async (req, res) => {
    try {
      const doctor = await DoctorModel.findById(req.params.id);
      res.status(200);
      await res.json(doctor);
    } catch (e) {
      console.error(e);
      res.status(500);
      await res.json('Could not get the doctor');
    }
  });

  /* add a patient to doctor */
  doctorRouter.post('/addPatient/:id', async (req, res) => {
    const doctor = await DoctorModel.findById(req.params.id);
    doctor.patients.push(req.body);
    try {
      await doctor.save().then((item) => res.send(item));
    } catch (e) {
      console.error(e);
      res.status(500);
      await res.json('Could not add patient');
    }
  });

  /* remove a patient from doctor */
  doctorRouter.delete('/rmvPatient', async (req, res) => {
    const doctor = new DoctorModel(req.body);
    doctor.patients.pull(req.body);
    try {
      await doctor.save().then((item) => res.send(item));
    } catch (e) {
      console.error(e);
      res.status(500);
      await res.json('Could not remove patient');
    }
  });

};

module.exports = initializeDoctorRoutes;
