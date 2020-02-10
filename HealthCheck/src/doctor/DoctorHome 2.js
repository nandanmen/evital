import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {Dropdown} from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import posed from 'react-native-pose';
import {LineChart} from 'react-native-chart-kit';
import Blood from '../assets/blood.png';
import Pulse from '../assets/pulse.png';
import Respiration from '../assets/respiration.png';
import Temperature from '../assets/temperature.png';

const defaultPatients = [
  {
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
        unit: 'breaths/min',
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
  },
  {
    id: 1,
    name: 'Sandy',
    fullName: 'Sandy Co',
    gender: 'F',
    age: 22,
    vitals: [
      {
        name: 'pulse rate',
        value: 65,
        unit: 'bpm',
        icon: Pulse,
      },
      {
        name: 'blood pressure',
        value: '100/60',
        unit: 'mmHg',
        icon: Blood,
      },
      {
        name: 'body temperature',
        value: '35.5',
        unit: 'C',
        icon: Temperature,
      },
      {
        name: 'respiration rate',
        value: '10-15',
        unit: 'breaths/min',
        icon: Respiration,
      },
    ],
    tasks: [],
    prescriptions: [],
  },
];

const lineData = {
  labels: ['11:00', '12:00', '13:00', '14:00'],
  datasets: [
    {
      data: [75, 90, 95, 70],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#FFF',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#FFF',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

const DoctorHome = ({user}) => {
  const {patients = defaultPatients} = user;
  const [patient, setPatient] = useState(patients[0].id);
  const [cardState, open] = useState(null);
  const [showToast, setShowToast] = useState(Boolean(user.queue[0]));

  const activePatient = patients.find(p => p.id === patient);
  const isOpen = index => cardState !== null && cardState === index;
  const queue = user.queue[0];

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Popup
        style={{
          ...styles.card,
          position: 'absolute',
          top: 100,
          left: 35,
          right: 35,
          backgroundColor: '#FFBF69',
          color: 'white',
          zIndex: 1,
        }}
        pose={showToast ? 'open' : 'close'}>
        <Text style={{color: '#fff'}}>You have a new patient!</Text>
        <TouchableOpacity
          onPress={() => {
            setPatient(queue.id);
            setShowToast(false);
          }}>
          <Text style={{color: '#fff', textDecorationLine: 'underline'}}>
            Confirm Patient
          </Text>
        </TouchableOpacity>
      </Popup>
      <Text style={styles.title}>Hello Dr. {user.name}!</Text>
      <Dropdown
        animationDuration={50}
        data={patients}
        value={patient}
        valueExtractor={p => p.id}
        label="Your patient:"
        labelExtractor={p => p.name}
        onChangeText={p => setPatient(p)}
      />
      <View
        style={{
          ...styles.card,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 17,
        }}>
        <View>
          <Text style={styles.text}>{activePatient.fullName}</Text>
          <Text style={styles.text}>Gender: {activePatient.gender}</Text>
          <Text style={styles.text}>Age: {activePatient.age}</Text>
        </View>
        <Icon name="right" size={18} />
      </View>
      <View style={styles.vitalContainer}>
        {activePatient.vitals.map((info, index) => (
          <TouchableOpacity
            onPress={() => open(cardState === null ? index : null)}>
            <Vital
              style={{
                ...styles.card,
                height: 162,
                width: 162,
                marginBottom: index < 2 ? 17 : 0,
              }}
              pose={isOpen(index) ? 'open' : 'close'}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: isOpen(index) ? 'row' : 'column',
                  alignItems: isOpen(index) ? 'center' : 'stretch',
                  marginBottom: isOpen(index) ? 8 : 0,
                }}>
                <Image
                  style={{
                    width: 32,
                    height: 32,
                    marginBottom: isOpen(index) ? 0 : 8,
                    marginRight: isOpen(index) ? 8 : 0,
                  }}
                  source={info.icon}
                />
                <Text
                  style={{
                    fontSize: 16,
                    textTransform: 'capitalize',
                    marginBottom: isOpen(index) ? 0 : 8,
                    marginRight: isOpen(index) ? 8 : 0,
                  }}>
                  {info.name}
                </Text>
                <Text style={{fontSize: 18}}>
                  {info.value} {info.unit}
                </Text>
              </View>
              {isOpen(index) && (
                <View>
                  <LineChart
                    data={lineData}
                    width={295}
                    height={250}
                    chartConfig={chartConfig}
                  />
                </View>
              )}
            </Vital>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <View style={{marginTop: 24}}>
          <Text
            style={{
              ...styles.lg,
              marginBottom: 17,
            }}>
            Patient Tasks
          </Text>
        </View>
        {activePatient.tasks && activePatient.tasks.length ? (
          activePatient.tasks.map(task => (
            <View
              style={{
                ...styles.card,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 17,
                paddingLeft: 15,
              }}>
              <CheckBox
                disabled
                checked={task.isCompleted}
                containerStyle={{margin: 0, padding: 0}}
              />
              <Text>{task.description}</Text>
            </View>
          ))
        ) : (
          <Text>There are no tasks yet for this patient.</Text>
        )}
      </View>
      <View>
        <Text style={{...styles.lg, marginVertical: 17}}>Prescriptions</Text>
        {activePatient.prescriptions && activePatient.prescriptions.length ? (
          activePatient.prescriptions.map(prescription => (
            <View
              style={{
                ...styles.card,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 17,
                paddingLeft: 15,
              }}>
              <CheckBox
                disabled
                checked={prescription.isCompleted}
                containerStyle={{margin: 0, padding: 0}}
              />
              <Text>{prescription.description}</Text>
            </View>
          ))
        ) : (
          <Text>There are no prescriptions yet for this patient.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default DoctorHome;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 35,
    paddingVertical: 113,
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  lg: {
    fontSize: 21,
  },
  title: {
    fontWeight: '600',
    fontSize: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  vitalContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 17,
    zIndex: 0,
    position: 'relative',
  },
});

const Vital = posed.View({
  close: {
    zIndex: -1,
    width: 162,
    height: 162,
  },
  open: {
    zIndex: 10,
    width: 345,
    height: 341,
  },
});

const Popup = posed.View({
  close: {
    top: -100,
  },
  open: {
    top: 100,
  },
});
