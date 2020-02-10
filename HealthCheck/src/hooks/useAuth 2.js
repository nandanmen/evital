import {useState} from 'react';
import {TYPES} from '../constants';
import Blood from '../assets/blood.png';
import Pulse from '../assets/pulse.png';
import Respiration from '../assets/respiration.png';
import Temperature from '../assets/temperature.png';

const patient = {
  id: 0,
  name: 'Noor',
  fullName: 'Noor Khan',
  gender: 'M',
  age: 22,
  vitals: [
    {
      name: 'pulse rate',
      value: 89,
      unit: 'bpm',
      icon: Pulse,
    },
    {
      name: 'blood pressure',
      value: '120/80',
      unit: 'mmHg',
      icon: Blood,
    },
    {
      name: 'body temperature',
      value: '36.5',
      unit: 'C',
      icon: Temperature,
    },
    {
      name: 'respiration rate',
      value: '12-20',
      unit: 'breaths per minute',
      icon: Respiration,
    },
  ],
  tasks: [
    {
      description: 'Check blood pressure every 3 days for 2 weeks',
      isCompleted: false,
    },
    {
      description: 'Take medication every 12 noon',
      isCompleted: false,
    },
  ],
  prescriptions: [
    {
      description: '12 tablets of Ventolin HFA',
      isCompleted: false,
    },
    {
      description: '4 tablets of Nexium',
      isCompleted: false,
    },
  ],
  type: TYPES.PATIENT,
};

const doctor = {
  name: 'Drake Ramoray',
  type: TYPES.DOCTOR,
  queue: [{id: 0}],
};

const useAuth = (type = TYPES.DOCTOR) => {
  return type === TYPES.DOCTOR ? doctor : patient;
};

export default useAuth;
