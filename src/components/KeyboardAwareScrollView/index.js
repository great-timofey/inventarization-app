// @flow

import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { normalize } from 'global/utils';

import styles from './styles';
import type { Props } from './types';

const ScrollViewContainer = ({ children }: Props) => (
  <KeyboardAwareScrollView
    style={styles.color}
    contentContainerStyle={styles.container}
  >
    {children}
  </KeyboardAwareScrollView>
);
export default ScrollViewContainer;
