// @flow

import React from 'react';
import { View } from 'react-native';

import Icon from 'assets/InventoryIcon';

import colors from 'global/colors';
import { normalize } from 'global/utils';

import styles from './styles';
import type { Props } from './types';

const SortButton = ({
  size,
  onPress,
  iconName,
  iconColor,
  customStyle,
  customPosition,
}: Props) => (
  <View style={[styles.container, customStyle]}>
    <Icon.Button
      name={iconName}
      activeOpacity={0.5}
      size={normalize(size)}
      style={styles.wrapper}
      underlayColor="transparent"
      color={iconColor || colors.white}
      backgroundColor={colors.transparent}
      onPress={onPress ? () => onPress() : () => {}}
      iconStyle={[{ marginRight: 0 }, customPosition]}
    />
  </View>
);

export default SortButton;
