// @flow

import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import colors from 'global/colors';
import { deviceHeight, deviceWidth } from 'global/device';
import styles from './styles';

function Loader() {
  return (
    <View
      style={{
        position: 'absolute',
        width: deviceWidth,
        height: deviceHeight,
        alignItems: 'center',
        flexDirection: 'center',
        backgroundColor: 'grey',
      }}
    >
      <ActivityIndicator size="large" color={colors.accent} />
    </View>
  );
}

export default Loader;
