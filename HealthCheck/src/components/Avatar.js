import React from 'react';
import {Image} from 'react-native';

const Avatar = ({style, onPress}) => (
  <Image
    source={{
      uri:
        'https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg',
    }}
    style={{width: 48, height: 48, borderRadius: 24, ...style}}></Image>
);

export default Avatar;
