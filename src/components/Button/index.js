// @flow

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import type { Props } from './types';
import styles from './styles';

const Button = ({ title, onPress, isDisable, isGreen }: Props) => (
  <TouchableOpacity
    disabled={isDisable}
    onPress={onPress}
    style={[
      styles.container,
      isGreen && styles.green,
      isDisable && styles.disable,
    ]}
  >
    <Text style={[styles.titleText, isDisable && styles.titleTextDisable]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default Button;
