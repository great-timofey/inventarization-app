// @flow

import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import type { Props } from './types';

const ScrollViewContainer = ({ children, bgColor, ...rest }: Props) => (
  <KeyboardAwareScrollView
    bottomOffset={216}
    disableAutomaticScroll
    style={{ backgroundColor: bgColor }}
    contentContainerStyle={styles.container}
    {...rest}
  >
    {children}
  </KeyboardAwareScrollView>
);
export default ScrollViewContainer;
