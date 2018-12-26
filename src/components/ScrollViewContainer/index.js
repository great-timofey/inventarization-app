// @flow

import React, { PureComponent } from 'react';
import { Keyboard, Animated } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { normalize, isSmallDevice } from '~/global/utils';
import styles from './styles';
import type { Props, State } from './types';

class ScrollViewContainer extends PureComponent<Props, State> {
  keyboardPadding = new Animated.Value(0);
  paddingContainer = new Animated.Value(normalize(30));

  componentDidMount() {
    const { keyboardPadding, paddingContainer } = this;
    const listenerShow = 'keyboardWillShow';
    const listenerHide = 'keyboardWillHide';
    Keyboard.addListener(listenerShow, (event) => {
      Animated.parallel([
        Animated.timing(keyboardPadding, {
          duration: 250,
          toValue: -event.endCoordinates.height,
        }),
        Animated.timing(paddingContainer, {
          duration: 250,
          toValue: isSmallDevice ? normalize(57) : normalize(30),
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
    const { keyboardPadding, paddingContainer } = this.state;

    return (
      <KeyboardAwareScrollView
        bottomOffset={216}
        disableAutomaticScroll
        style={{ backgroundColor: bgColor }}
        contentContainerStyle={styles.container}
        {...rest}
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
