// @flow

import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import type { Props } from './types';
import styles from './styles';

const Button = ({ title, onPressButton }: Props) => (
  <TouchableWithoutFeedback onPress={onPressButton}>
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
);

export default Button;
