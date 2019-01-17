// @flow

import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import type { Props } from './types';

const Warning = ({ warning }: Props) => (
  <View style={[styles.visibleContainer, !warning && styles.hiddenContainer]}>
    <Text style={styles.errorText}>{warning}</Text>
  </View>
);
export default Warning;
