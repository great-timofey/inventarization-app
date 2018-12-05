// @flow

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import type { Props } from './types';
import styles from './styles';

const Button = ({ title, onPress, isDisable }: Props) => (
  <TouchableOpacity
    disabled={isDisable}
    onPress={onPress}
    style={isDisable ? styles.disable : styles.container}
  >
    <Text style={isDisable ? styles.titleTextDisable : styles.titleText}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default Button;
