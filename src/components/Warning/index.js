// @flow

import React from 'react';
import { View, Text } from 'react-native';

import constants from 'global/constants';

import styles from './styles';
import type { Props } from './types';

const Warning = ({ isEmail, isVisible }: Props) => (
  <View style={[styles.visibleContainer, !isVisible && styles.hiddenContainer]}>
    <Text style={styles.errorText}>
      {isEmail ? constants.errors.login.email : constants.errors.login.password}
    </Text>
  </View>
);
export default Warning;
