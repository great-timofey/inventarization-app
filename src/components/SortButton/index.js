// @flow

import React from 'react';
import { View, Text } from 'react-native';

import InventoryIcon from 'assets/InventoryIcon';

import colors from 'global/colors';
import { normalize } from 'global/utils';

import styles from './styles';

const iconProps = {
  size: normalize(55),
  backgroundColor: colors.transparent,
};

const SortButton = () => (
  <View style={styles.container}>
    <InventoryIcon.Button
      {...iconProps}
      color={colors.white}
      name="button-sort-name"
      style={{ margin: 0, padding: 0 }}
    />
  </View>
);

export default SortButton;
