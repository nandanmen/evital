import React, {useState, useEffect} from 'react';
import Avatar from '../components/Avatar';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  ScrollView,
} from 'react-native';
import {getDoctors, addPatient} from '../api';

const FindDoctor = ({user, onPress}) => {
  const hasDoctor = Boolean(user.doctor);
  const [sentRequest, setSent] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [sentDoctor, setSentDoctor] = useState(null);

  useEffect(() => {
    getDoctors().then(data => setDoctors(data));
  });

  const send = doctor => {
    setSent(true);
    setSentDoctor(doctor);
    addPatient(doctor.id, user.id);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        display: 'flex',
        alignItems: 'center',
        paddingVertical: 120,
        paddingHorizontal: 35,
      }}>
      <TouchableOpacity
        style={{position: 'absolute', left: 35, top: 80}}
        onPress={onPress}>
        <View>
          <Icon name="left" size={32} />
        </View>
      </TouchableOpacity>
      <Avatar style={{width: 84, height: 84, borderRadius: 42}} />
      <Text
        style={{
          fontWeight: '600',
          fontSize: 24,
          marginTop: 24,
        }}>
        {user.name}
      </Text>
      {hasDoctor ? (
        <View
          style={{
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
          }}>
          <Text>Dr. {user.doctor.name}</Text>
          <Text>Location: {user.doctor.location}</Text>
        </View>
      ) : (
        <View>
          <Text style={{marginTop: 32, textAlign: 'center'}}>
            You don't have a doctor yet. Let's connect one for you.
          </Text>
          {doctors &&
            doctors.map(doctor => (
              <TouchableOpacity onPress={() => send(doctor)}>
                <View
                  style={{
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
                    marginTop: 17,
                  }}>
                  <Text>Dr. {doctor.name}</Text>
                  <Text>Location: {doctor.location}</Text>
                </View>
              </TouchableOpacity>
            ))}
          {sentRequest && (
            <Text style={{textAlign: 'center', fontSize: 18, marginTop: 17}}>
              Thanks! A confirmation request has been sent to Dr.{' '}
              {sentDoctor.name}.
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default FindDoctor;
