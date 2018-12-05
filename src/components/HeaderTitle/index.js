// @flow

import React from 'react';
import { Text, View } from 'react-native';

import constants from 'global/constants';

import styles from './styles';

const HeaderTitle = () => (
  <View>
    <Text style={styles.headerTitle} numberOfLines={2}>
      {constants.forgotPassText.headerTitle}
    </Text>
  </View>
);
export default HeaderTitle;
