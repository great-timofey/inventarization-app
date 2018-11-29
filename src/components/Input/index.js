// @flow

import React, { PureComponent } from 'react';
import { View, Text, TextInput } from 'react-native';

import constants from 'global/constants';
import type { Props } from './types';
import styles from './styles';

class Input extends PureComponent<Props> {
  ref: any;

  render() {
    const {
      props: { type, value, state, onChangeText, focusNextField, onPushButton },
    } = this;

    let secureTextEntry = false;
    let keyboardType = 'default';
    let returnKeyType = 'next';
    let autoCapitalize = 'none';
    let onSubmitEditing = () => focusNextField(type);
    switch (type) {
      case constants.inputTypes.name:
        autoCapitalize = 'sentences';
        break;
      case constants.inputTypes.email:
        keyboardType = 'email-address';
        break;
      case constants.inputTypes.password:
        secureTextEntry = true;
        returnKeyType = state ? 'next' : 'go';
        onSubmitEditing = state
          ? () => focusNextField(type)
          : () => onPushButton(type);
        break;
      case constants.inputTypes.mobileNumber:
        keyboardType = 'numbers-and-punctuation';
        onSubmitEditing = () => onPushButton(type);
        returnKeyType = 'go';
        break;
      default:
        break;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.inputTitleText}>{type}</Text>
        <TextInput
          onSubmitEditing={onSubmitEditing}
          ref={ref => {
            this.ref = ref;
          }}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          style={styles.input}
          onChangeText={onChangeText(value)}
          value={value}
        />
      </View>
    );
  }
}

export default Input;
