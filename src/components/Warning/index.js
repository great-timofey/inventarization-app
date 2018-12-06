// @flow

import React from 'react';
import { View, Text } from 'react-native';

import constants from 'global/constants';

import styles from './styles';
import type { Props } from './types';

const Warning = ({ isEmail, isVisible, notMatch }: Props) => {
  let text: string = '';

  if (isEmail) {
    text = constants.errors.login.email;
  } else {
    text = constants.errors.login.password;
  }
  if (notMatch) {
    text = constants.errors.login.notMatch;
  }
  return (
    <View
      style={[styles.visibleContainer, !isVisible && styles.hiddenContainer]}
    >
      <Text style={styles.errorText}>{text}</Text>
    </View>
  );
};
export default Warning;
