// @flow

import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';

import utils from 'global/utils';
import constants from 'global/constants';
import type { Props } from './types';
import styles from './styles';

class Input extends PureComponent<Props> {
  render() {
    const {
      type,
      nextRefName,
      value,
      state,
      onChangeText,
      focusField,
      onPushButton,
      fieldRef,
      refEl,
    } = this.props;
    let secureTextEntry = false;
    let keyboardType = 'default';
    let returnKeyType = 'next';
    let autoCapitalize = 'none';
    let isValideValue = true;
    let onSubmitEditing = () => focusField(nextRefName);

    switch (type) {
      case constants.inputTypes.name:
        autoCapitalize = 'sentences';
        break;
      case constants.inputTypes.email:
        if (value) {
          isValideValue = utils.validateFunction(constants.regExp.email, value);
        }
        keyboardType = 'email-address';
        break;
      case constants.inputTypes.password:
        if (value) {
          isValideValue = utils.validateFunction(
            constants.regExp.password,
            value
          );
        }
        secureTextEntry = true;
        returnKeyType = state ? 'next' : 'go';
        onSubmitEditing = state
          ? () => focusField(nextRefName)
          : () => onPushButton(type);
        break;
      case constants.inputTypes.mobileNumber:
        if (value) {
          isValideValue = utils.validateFunction(
            constants.regExp.mobileNumber,
            value
          );
        }
        keyboardType = 'numbers-and-punctuation';
        onSubmitEditing = () => onPushButton(type);
        returnKeyType = 'go';
        break;
      default:
        break;
    }

    return (
      <TouchableWithoutFeedback onPress={() => focusField(refEl)}>
        <View style={styles.container}>
          <Text
            style={isValideValue ? styles.inputTitleText : styles.notValide}
          >
            {type}
          </Text>
          <TextInput
            onSubmitEditing={onSubmitEditing}
            ref={fieldRef}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            style={styles.input}
            onChangeText={onChangeText}
            value={value}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Input;
