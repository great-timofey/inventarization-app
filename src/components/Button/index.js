// @flow

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import type { Props } from './types';
import styles from './styles';

const Button = ({ title, onPress }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.titleText}>{title}</Text>
  </TouchableOpacity>
);

export default Button;
