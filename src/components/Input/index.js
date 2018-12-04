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
      refEl,
      fieldRef,
      focusField,
      placeholder,
      nextRefName,
      onPushButton,
      onChangeText,
      keyboardType,
      returnKeyType,
      secureTextEntry,
    } = this.props;

    let isValideValue = true;
    if (type !== constants.inputTypes.name) {
      isValideValue = value !== '' ? utils.validateFunction(value, type) : true;
    }

    return (
      <TouchableWithoutFeedback onPress={() => focusField(refEl)}>
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
            returnKeyType={returnKeyType || 'next'}
            autoCapitalize="none"
            onSubmitEditing={
              returnKeyType ? onPushButton : () => focusField(nextRefName)
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
