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
      await res.json('Could not get the patient');
    }
  });

  /* add pulseRate by id */
  patientRouter.post('/pulseRate/:id', async (req, res) => {
    const patient = await PatientModel.findById(req.params.id);
    patient.pulseRates.push(req.body);
    try {
      await patient.save().then((item) => res.send(item));
    } catch (e) {
      console.error(e);
      res.status(500);
      await res.json('Could not add pulseRate');
    }
  });

  /* add bloodPressure by id */
  patientRouter.post('/bloodPressure/:id', async (req, res) => {
    const patient = await PatientModel.findById(req.params.id);
    patient.bloodPressures.push(req.body);
    try {
      await patient.save().then((item) => res.send(item));
    } catch (e) {
      console.error(e);
      res.status(500);
      await res.json('Could not add pulseRate');
    }
  });

  /* add bodyTemp by id */
  patientRouter.post('/bodyTemp/:id', async (req, res) => {
    const patient = await PatientModel.findById(req.params.id);
    patient.bodyTemps.push(req.body);
    try {
      await patient.save().then((item) => res.send(item));
    } catch (e) {
      console.error(e);
      res.status(500);
      await res.json('Could not add pulseRate');
    }
  });

  /* add respRate by id */
  patientRouter.post('/respirationRate/:id', async (req, res) => {
    const patient = await PatientModel.findById(req.params.id);
    patient.respirationRates.push(req.body);
    try {
      await patient.save().then((item) => res.send(item));
    } catch (e) {
      console.error(e);
      res.status(500);
      await res.json('Could not add pulseRate');
    }
  });

  /* add taskList by id */
  patientRouter.post('/task/:id', async (req, res) => {
    const patient = await PatientModel.findById(req.params.id);
    patient.tasks.push(req.body);
    try {
      await patient.save().then((item) => res.send(item));
    } catch (e) {
      console.error(e);
      res.status(500);
      await res.json('Could not add pulseRate');
    }
  });

  /* add prescription by id */
  patientRouter.post('/prescription/:id', async (req, res) => {
    const patient = await PatientModel.findById(req.params.id);
    patient.prescriptions.push(req.body);
    try {
      await patient.save().then((item) => res.send(item));
    } catch (e) {
      console.error(e);
      res.status(500);
      await res.json('Could not add pulseRate');
    }
  });
};

module.exports = initializePatientRoutes;
