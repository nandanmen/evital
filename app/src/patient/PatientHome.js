import React, {useState, useEffect} from 'react';
import posed from 'react-native-pose';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {LineChart} from 'react-native-chart-kit';
import useHealthKit from '../hooks/useHealthKit';
import {parseISO, format} from 'date-fns';
import Avatar from '../components/Avatar';

const chartConfig = {
  backgroundGradientFrom: '#FFF',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#FFF',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

const generateLineData = rates =>
  rates &&
  rates.length && {
    labels: rates
      .reverse()
      .map(rate => format(parseISO(rate.startDate), 'h:mm')),
    datasets: [
      {
        data: rates.reverse().map(rate => rate.value),
      },
    ],
  };

const PatientHome = ({user, onPress}) => {
  const heartRate = useHealthKit();
  const [cardState, open] = useState(null);
  const [loading, setLoading] = useState(true);
  const isOpen = index => cardState !== null && cardState === index;

  useEffect(() => {
    if (heartRate) setLoading(false);
  }, [heartRate]);

  const data = generateLineData(heartRate);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <TouchableOpacity
        style={{position: 'absolute', right: 35, top: 100}}
        onPress={onPress}>
        <Avatar />
      </TouchableOpacity>
      <Text style={styles.title}>Hello {user.name}!</Text>
      <Text style={styles.lg}>Here are your current vitals:</Text>
      <View style={styles.vitalContainer}>
        {user.vitals.map((info, index) => (
          <TouchableOpacity
            onPress={() => open(cardState === null ? index : null)}>
            <Vital
              style={{
                ...styles.card,
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
                  {loading
                    ? 'Fetching...'
                    : data.datasets[0].data[
                        data.datasets[0].data.length - 1
                      ]}{' '}
                  {info.unit}
                </Text>
              </View>
              {isOpen(index) && !loading && (
                <View>
                  <LineChart
                    data={data}
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
      <View style={{marginTop: 25}}>
        <Text
          style={{
            ...styles.lg,
            marginBottom: 17,
          }}>
          Patient Tasks
        </Text>
        {user.tasks && user.tasks.length ? (
          user.tasks.map(task => (
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
    </ScrollView>
  );
};

export default PatientHome;

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
  title: {
    fontWeight: '600',
    fontSize: 24,
    marginBottom: 17,
  },
  lg: {
    fontSize: 21,
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
    height: 180,
  },
  open: {
    zIndex: 10,
    width: 345,
    height: 360,
  },
});
