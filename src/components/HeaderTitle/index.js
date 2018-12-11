// @flow

import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import type { Props } from './types';

const HeaderTitle = ({ title, color }: Props) => (
  <View style={styles.headerTitle}>
    <Text style={[styles.headerTitleText, { color }]} numberOfLines={2}>
      {title}
    </Text>
  </View>
);
export default HeaderTitle;
