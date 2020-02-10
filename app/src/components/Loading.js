import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import Animation from '../assets/out.gif';

const Loading = () => (
  <View
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: Dimensions.get('window').height,
      backgroundColor: '#FFBF69',
    }}>
    <Image source={Animation} style={{width: 200, height: 200}} />
    <Text
      style={{
        color: 'white',
        fontSize: 24,
        marginTop: 16,
        textAlign: 'center',
        fontWeight: '600',
      }}>
      eVital
    </Text>
    <Text
      style={{
        color: 'white',
        fontSize: 16,
        marginTop: 12,
        textAlign: 'center',
      }}>
      Checking your health...
    </Text>
  </View>
);

export default Loading;
