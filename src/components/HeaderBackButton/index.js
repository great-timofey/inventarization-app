// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';

import styles from './styles';
import type { Props } from './types';

const HeaderBackButton = ({ onPress }: Props) => (
  <TouchableOpacity style={styles.headerLeft} onPress={onPress}>
    <Icon
      color={colors.blue}
      size={normalize(40)}
      name="ios-arrow-round-back"
      backgroundColor={colors.transparent}
    />
  </TouchableOpacity>
);
export default HeaderBackButton;
