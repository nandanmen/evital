const BASE_URL = 'http://137.135.118.228:8080';

export const getDoctors = () =>
  fetch(`${BASE_URL}/doctor`).then(res => res.json());

export const addPatient = (doctorId, patientId) =>
  fetch(`${BASE_URL}/doctor/addPatient/${doctorId}`, {
    method: 'POST',
    body: {patient: patientId},
  });
