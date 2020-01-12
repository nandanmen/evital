const express = require("express");
const mongoose = require("mongoose");
const initializePatientRoutes = require("./src/routes/patientRoutes");
const initializeDoctorRoutes = require("./src/routes/doctorRoutes");

const bodyParser = require("body-parser");

const PORT = 8080;
const DB_CONNECTION_STRING = 'mongodb+srv://user1:PGM4Fr4HG6Y5GUTE@cluster0-eiz7g.mongodb.net/db?retryWrites=true&w=majority'
  || 'mongodb://localhost:27017/test';
const app = express();

// middle wares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize the routes
initializePatientRoutes(app);
initializeDoctorRoutes(app);

// Connect to DB
mongoose
    .connect(DB_CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB!'));

try {
    app.listen(PORT);
    console.log(`Server listening on port ${PORT}`);
} catch (e) {
    console.error(e);
    throw e;
}


