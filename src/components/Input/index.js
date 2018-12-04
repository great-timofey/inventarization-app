// @flow

import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';

import utils from 'global/utils';
import colors from 'global/colors';
import constants from 'global/constants';

import type { Props } from './types';
import styles from './styles';

const KEY_TYPES = {
  GO: 'go',
  NEXT: 'next',
};

const isEmpty = value => value === '';

class Input extends PureComponent<Props> {
  render() {
    const {
      type,
      value,
      fieldRef,
      focusField,
      placeholder,
      onSubmitForm,
      onChangeText,
      keyboardType,
      returnKeyType,
      secureTextEntry,
      onSubmitEditing,
    } = this.props;

    let isValideValue = true;
    if (type !== constants.inputTypes.name && !isEmpty(value)) {
      isValideValue = utils.isValidate(value, type);
    }

    return (
      <TouchableWithoutFeedback onPress={focusField}>
        <View
          style={isValideValue ? styles.container : styles.inValideContainer}
        >
          <Text style={styles.inputTitleText}>{type}</Text>
          <TextInput
            value={value}
            ref={fieldRef}
            autoCorrect={false}
            style={styles.input}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            returnKeyType={returnKeyType || KEY_TYPES.NEXT}
            autoCapitalize="none"
            onSubmitEditing={
              returnKeyType === KEY_TYPES.GO ? onSubmitForm : onSubmitEditing
            }
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={colors.text.placeholder}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Input;
