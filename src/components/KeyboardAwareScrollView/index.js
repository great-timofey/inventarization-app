// @flow

import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { normalize } from 'global/utils';

import styles from './styles';
import type { Props } from './types';

const ScrollViewContainer = ({ children }: Props) => (
  <KeyboardAwareScrollView
    style={styles.color}
    extraScrollHeight={normalize(15)}
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={styles.container}
  >
    {children}
  </KeyboardAwareScrollView>
);
export default ScrollViewContainer;
