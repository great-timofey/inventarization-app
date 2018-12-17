// @flow

import React from 'react';
import { View } from 'react-native';

import CustomIcon from '~/assets/InventoryIcon';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';

import styles from './styles';
import type { Props } from './types';

const SortButton = ({
  size,
  onPress,
  iconName,
  iconColor,
  isDisabled,
  customStyle,
  isCloseButton,
  customPosition,
}: Props) => (
  <View style={[styles.container, customStyle]}>
    {isCloseButton
      ? (
        <Icon.Button
          size={45}
          name="ios-close"
          activeOpacity={0.5}
          color={colors.button.close}
          style={{ padding: 10 }}
          iconStyle={[{ marginRight: 0 }, customPosition]}
          underlayColor="transparent"
          backgroundColor={colors.transparent}
          onPress={onPress ? () => onPress() : () => {}}
        />
      )
      : (
        <CustomIcon.Button
          name={iconName}
          activeOpacity={0.5}
          disabled={isDisabled}
          size={normalize(size)}
          style={styles.wrapper}
          underlayColor="transparent"
          color={iconColor || colors.white}
          backgroundColor={colors.transparent}
          onPress={onPress ? () => onPress() : () => {}}
          iconStyle={[{ marginRight: 0 }, customPosition]}
        />
      )}
  </View>
);

export default SortButton;
