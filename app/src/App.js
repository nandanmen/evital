import React, {useState, useEffect} from 'react';
import {View, Text, Button, Dimensions} from 'react-native';
import useAuth from './hooks/useAuth';
import {TYPES} from './constants';
import DoctorHome from './doctor/DoctorHome';
import PatientHome from './patient/PatientHome';
import FindDoctor from './patient/FindDoctor';
import Loading from './components/Loading';

const App = () => {
  const [route, setRoute] = useState('home');
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(null);
  const homeMap = {
    [TYPES.DOCTOR]: DoctorHome,
    [TYPES.PATIENT]: PatientHome,
  };

  if (!type)
    return (
      <View
        style={{
          display: 'flex',
          height: Dimensions.get('window').height,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button onPress={() => setType(TYPES.DOCTOR)} title="Doctor"></Button>
        <Button onPress={() => setType(TYPES.PATIENT)} title="Patient"></Button>
      </View>
    );

  setTimeout(() => {
    setLoading(false);
  }, 6000);

  if (loading) return <Loading />;

  const goToFindDoctor = () => setRoute('find-doctor');
  const user = useAuth(type);

  const Component = homeMap[type];
  return (
    <View>
      {route === 'home' && <Component user={user} onPress={goToFindDoctor} />}
      {route === 'find-doctor' && (
        <FindDoctor user={user} onPress={() => setRoute('home')} />
      )}
    </View>
  );
};

export default App;
