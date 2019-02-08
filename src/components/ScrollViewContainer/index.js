// @flow

import React, { PureComponent } from 'react';
import { Keyboard, Animated } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import type { Props, State } from './types';

class ScrollViewContainer extends PureComponent<Props, State> {
  keyboardPadding = new Animated.Value(0);

  componentDidMount() {
    const { keyboardPadding } = this;
    const listenerShow = 'keyboardWillShow';
    const listenerHide = 'keyboardWillHide';

    Keyboard.addListener(listenerShow, (event) => {
      Animated.parallel([
        Animated.timing(keyboardPadding, {
          duration: 250,
          toValue: -event.endCoordinates.height,
        }),
      ]).start();
    });
    Keyboard.addListener(listenerHide, () => {
      Animated.parallel([
        Animated.timing(keyboardPadding, {
          duration: 250,
          toValue: 0,
        }),
      ]).start();
    });
  }

  render() {
    const {
      keyboardPadding,
      props: {
        children,
        fieldRef,
        bgColor,
        ...rest
      },
    } = this;

    return (
      <KeyboardAwareScrollView
        {...rest}
        ref={fieldRef}
        enableOnAndroid
        bottomOffset={400}
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
          ]}
        >
          {children}
        </Animated.View>
      </KeyboardAwareScrollView>
    );
  }
}

export default ScrollViewContainer;
