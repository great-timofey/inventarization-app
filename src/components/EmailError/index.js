// @flow

import React from 'react';
import { View, Text } from 'react-native';

import constants from 'global/constants';

import styles from './styles';

const EmailError = () => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{constants.errors.login.email}</Text>
  </View>
);
export default EmailError;
