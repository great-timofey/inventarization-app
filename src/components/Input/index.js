// @flow

import React from 'react';
import { View, Text, TextInput } from 'react-native';

// import inputType from 'global/constants';
import type { Props } from './types';
import styles from './styles';

const Input = ({ value, onChangeText, type }: Props) => (
  <View style={styles.container}>
    <Text style={styles.inputTitleText}>{type}</Text>
    <TextInput
      autoCorrect={false}
      style={styles.input}
      onChangeText={onChangeText(value)}
      value={value}
    />
  </View>
);

export default Input;
