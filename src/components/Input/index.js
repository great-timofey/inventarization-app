// @flow

import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';

import utils from 'global/utils';
import constants from 'global/constants';
import colors from 'global/colors';
import type { Props } from './types';
import styles from './styles';

class Input extends PureComponent<Props> {
  render() {
    const {
      type,
      value,
      state,
      refEl,
      fieldRef,
      focusField,
      placeholder,
      nextRefName,
      onChangeText,
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
        onSubmitEditing = state ? () => focusField(nextRefName) : () => {};
        break;
      case constants.inputTypes.mobileNumber:
        if (value) {
          isValideValue = utils.validateFunction(
            constants.regExp.mobileNumber,
            value
          );
        }
        keyboardType = 'numbers-and-punctuation';
        onSubmitEditing = () => {};
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
            value={value}
            ref={fieldRef}
            autoCorrect={false}
            style={styles.input}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            returnKeyType={returnKeyType}
            autoCapitalize={autoCapitalize}
            onSubmitEditing={onSubmitEditing}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder || null}
            placeholderTextColor={colors.text.placeholder}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Input;
