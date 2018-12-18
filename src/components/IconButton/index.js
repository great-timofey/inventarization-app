// @flow

import React from 'react';
import { View } from 'react-native';

import CustomIcon from '~/assets/InventoryIcon';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';

import styles from './styles';
import type { Props } from './types';

const buttonProps = {
  activeOpacity: 0.5,
  underlayColor: colors.transparent,
  backgroundColor: colors.transparent,
};

const IconButton = ({
  size,
  onPress,
  iconName,
  iconColor,
  isDisabled,
  isCustomIcon,
  customPosition,
  customContStyle,
  customIconStyle,
}: Props) => (
  <View style={[{ justifyContent: 'center', alignItems: 'center' }, customPosition]}>
    {!isCustomIcon
      ? (
        <Icon.Button
          {...buttonProps}
          name={iconName}
          size={size ? normalize(size) : null}
          color={iconColor || colors.button.close}
          onPress={onPress ? () => onPress() : undefined}
          style={[styles.container, customContStyle && customContStyle]}
          iconStyle={[{ marginRight: 0 }, customIconStyle && customIconStyle]}
        />
      )
      : (
        <CustomIcon.Button
          {...buttonProps}
          name={iconName}
          disabled={isDisabled}
          color={iconColor || colors.white}
          size={size ? normalize(size) : null}
          onPress={onPress ? () => onPress() : undefined}
          style={[styles.container, customContStyle && customContStyle]}
          iconStyle={[{ marginRight: 0 }, customIconStyle && customIconStyle]}
        />
      )}
  </View>

);

export default IconButton;
