// @flow

import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

import type { Props } from './types';
import styles from './styles';

const HeaderButton = ({ isActive, onPress, name }: Props) => (
  <TouchableWithoutFeedback onPress={isActive ? onPress : null}>
    <View style={[styles.buttonHeader, !isActive && styles.inactiveHeaderBtn]}>
      <Text
        style={[styles.buttonText, !isActive && styles.inactiveHeaderBtnText]}
      >
        {name}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);
export default HeaderButton;
