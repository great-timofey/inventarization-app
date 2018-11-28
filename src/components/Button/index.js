// @flow

import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'global/colors';
import styles from './styles';

import type { ButtonProps } from './types';

const Button = ({ title, onPress }: ButtonProps) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.green, colors.darkGreen]}
      style={styles.linearGradient}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </LinearGradient>
  </TouchableWithoutFeedback>
);

export default Button;
