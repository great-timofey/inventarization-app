// @flow

import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import type { Props } from './types';

const ScrollViewContainer = ({ children, bgColor }: Props) => (
  <KeyboardAwareScrollView
    bottomOffset={216}
    style={{ backgroundColor: bgColor }}
    disableAutomaticScroll
    contentContainerStyle={styles.container}
  >
    {children}
  </KeyboardAwareScrollView>
);
export default ScrollViewContainer;
