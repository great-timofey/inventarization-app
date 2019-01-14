// @flow

import React, { PureComponent } from 'react';
import { Keyboard, Animated } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { normalize, isSmallDevice } from '~/global/utils';

import { isIphoneX } from '~/global/device';

import styles from './styles';
import type { Props, State } from './types';

class ScrollViewContainer extends PureComponent<Props, State> {
  keyboardPadding = new Animated.Value(0);
  paddingContainer = new Animated.Value(normalize(30));

  componentDidMount() {
    const { keyboardPadding, paddingContainer } = this;
    const listenerShow = 'keyboardWillShow';
    const listenerHide = 'keyboardWillHide';
    let bottomOffset = 0;

    if (isIphoneX) {
      bottomOffset = 100;
    } else if (isSmallDevice) {
      bottomOffset = 57;
    } else {
      bottomOffset = 30;
    }

    Keyboard.addListener(listenerShow, (event) => {
      Animated.parallel([
        Animated.timing(keyboardPadding, {
          duration: 250,
          toValue: -event.endCoordinates.height,
        }),
        Animated.timing(paddingContainer, {
          duration: 250,
          toValue: normalize(bottomOffset),
        }),
      ]).start();
    });
    Keyboard.addListener(listenerHide, () => {
      Animated.parallel([
        Animated.timing(keyboardPadding, {
          duration: 250,
          toValue: 0,
        }),
        Animated.timing(paddingContainer, {
          duration: 250,
          toValue: normalize(30),
        }),
      ]).start();
    });
  }

  render() {
    const { children, bgColor, ...rest } = this.props;
    const { keyboardPadding, paddingContainer } = this;

    return (
      <KeyboardAwareScrollView
        {...rest}
        bottomOffset={400}
        disableAutomaticScroll
        style={{ backgroundColor: bgColor }}
      >
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              transform: [
                {
                  translateY: keyboardPadding,
                },
              ],
            },
            { paddingVertical: paddingContainer },
          ]}
        >
          {children}
        </Animated.View>
      </KeyboardAwareScrollView>
    );
  }
}

export default ScrollViewContainer;
