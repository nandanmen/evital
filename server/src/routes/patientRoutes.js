const express = require("express");
const PatientModel = require("../models/patient");

const initializePatientRoutes = (app) => {
  const patientRouter = express.Router();
  app.use('/patient', patientRouter);

  /* post a patient */
  patientRouter.post('/', async (req, res) => {
    const patient = new PatientModel(req.body);
    try {
      await patient.save().then((item) => res.send(item));
    } catch (e) {
      console.error(e);
      res.status(500);
      await res.json('Could not create patient');
    }
  });

  /* get a patient by id */
  patientRouter.get('/:id', async (req, res) => {
    try {
      const patient = await PatientModel.findById(req.params.id);
      res.status(200);
      await res.json(patient);
    } catch (e) {
      console.error(e);
      res.status(500);
      await res.json('Could not fetch the patient');
    }
  });
};

module.exports = initializePatientRoutes;
