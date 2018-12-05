// @flow

import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import colors from 'global/colors';
import styles from './styles';

function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.accent} />
    </View>
  );
}

export default Loader;
