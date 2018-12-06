// @flow

import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import type { Props } from './types';

const HeaderTitle = ({ title }: Props) => (
  <View style={styles.headerTitle}>
    <Text style={styles.headerTitleText} numberOfLines={2}>
      {title}
    </Text>
  </View>
);
export default HeaderTitle;
