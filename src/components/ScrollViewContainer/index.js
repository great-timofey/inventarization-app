// @flow

import React, { PureComponent } from 'react';
import { Keyboard, Animated } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { normalize, isSmallDevice } from '~/global/utils';
import styles from './styles';
import type { Props, State } from './types';

const authSettings = {};

const createCompanySettings = {};

class ScrollViewContainer extends PureComponent<Props, State> {
  keyboardPadding = new Animated.Value(0);
  paddingTop = new Animated.Value(normalize(10));
  marginBottom = new Animated.Value(normalize(105));
  paddingContainer = new Animated.Value(normalize(30));

  // Animated.timing(keyboardPadding, {
  //   duration: 250,
  //   toValue: -event.endCoordinates.height,
  // }),
  // Animated.timing(paddingContainer, {
  //   duration: 250,
  //   toValue: isSmallDevice ? normalize(57) : normalize(30),
  // }),

  // Animated.timing(keyboardPadding, {
  //   duration: 250,
  //   toValue: 0,
  // }),
  // Animated.timing(paddingContainer, {
  //   duration: 250,
  //   toValue: normalize(30),
  // }),

  componentDidMount() {
    const { keyboardPadding, paddingContainer, paddingTop, marginBottom } = this;
    const listenerShow = 'keyboardWillShow';
    const listenerHide = 'keyboardWillHide';
    Keyboard.addListener(listenerShow, (event) => {
      Animated.parallel([
        this.generateAnimated(keyboardPadding, -event.endCoordinates.height),
        this.generateAnimated(paddingContainer, isSmallDevice ? normalize(57) : normalize(30)),
      ]).start();
    });
    Keyboard.addListener(listenerHide, () => {
      Animated.parallel([
        this.generateAnimated(keyboardPadding, 0),
        this.generateAnimated(paddingContainer, normalize(30)),
      ]).start();
    });
  }

  generateAnimated = (constraint, toValue) => Animated.timing(constraint, { duration: 250, toValue });

  render() {
    const { children, bgColor, ...rest } = this.props;
    const { keyboardPadding, paddingContainer } = this;

    return (
      <KeyboardAwareScrollView
        {...rest}
        bottomOffset={216}
        disableAutomaticScroll
        style={{ backgroundColor: bgColor }}
        contentContainerStyle={styles.container}
      >
        <Animated.View
          style={[
            styles.animatedContainer,
            { backgroundColor: bgColor },
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
