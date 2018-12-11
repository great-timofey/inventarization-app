// @flow

import React from 'react';
import { View, Text } from 'react-native';

// import constants from 'global/constants';

import styles from './styles';
import type { Props } from './types';

const Warning = ({ isVisible, title }: Props) => (
  <View style={[styles.visibleContainer, !isVisible && styles.hiddenContainer]}>
    <Text style={styles.errorText}>{title}</Text>
  </View>
);
export default Warning;
