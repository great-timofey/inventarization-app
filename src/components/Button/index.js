// @flow

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import type { Props } from './types';

const Button = ({ title, onPress, isDisable, isGreen, customStyle }: Props) => (
  <TouchableOpacity
    disabled={isDisable}
    onPress={onPress}
    style={[
      styles.container,
      isGreen && styles.green,
      isDisable && styles.disable,
      customStyle && { ...customStyle },
    ]}
  >
    <Text style={[styles.titleText, isDisable && styles.titleTextDisable]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default Button;
