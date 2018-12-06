// @flow

import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import assets from 'global/assets';

import type { Props } from './types';
import styles from './styles';

const HeaderBackbutton = ({ onPress }: Props) => (
  <TouchableOpacity style={styles.headerLeft} onPress={onPress}>
    <Image
      resizeMode="contain"
      style={styles.arrowImage}
      source={assets.headerBackArrow}
    />
  </TouchableOpacity>
);
export default HeaderBackbutton;
