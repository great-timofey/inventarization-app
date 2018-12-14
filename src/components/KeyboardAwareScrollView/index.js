// @flow

import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import type { Props } from './types';

const ScrollViewContainer = ({ children }: Props) => (
  <KeyboardAwareScrollView
    bottomOffset={216}
    style={styles.color}
    disableAutomaticScroll
    contentContainerStyle={styles.container}
  >
    {children}
  </KeyboardAwareScrollView>
);
export default ScrollViewContainer;
