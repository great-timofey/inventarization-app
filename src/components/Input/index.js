// @flow

import React, { Component } from 'react';
import TextInputMask from 'react-native-text-input-mask';
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

class Input extends Component<Props> {
  static defaultProps = {
    autoCorrect: false,
    autoCapitalize: 'none',
    returnKeyType: KEY_TYPES.NEXT,
  };

  shouldComponentUpdate(nextProps: Props) {
    const { type, value } = this.props;
    if (nextProps.value !== value) {
      return true;
    }
    if (type === constants.inputTypes.password) {
      return true;
    }
    return false;
  }

  render() {
    const {
      mask,
      type,
      value,
      fieldRef,
      focusField,
      onSubmitForm,
      returnKeyType,
      onSubmitEditing,
      ...textInputProps
    } = this.props;
    console.log(type);

    const CustomTextInput: any = mask ? TextInputMask : TextInput;

    let isValideValue = true;
    if (type.require && !isEmpty(value)) {
      isValideValue = utils.isValid(value, type);
    }

    return (
      <TouchableWithoutFeedback onPress={focusField}>
        <View
          style={[styles.container, !isValideValue && styles.invalidContainer]}
        >
          <Text style={styles.inputTitleText}>{type.label}</Text>
          <CustomTextInput
            {...textInputProps}
            mask={mask}
            value={value}
            ref={fieldRef}
            style={styles.input}
            returnKeyType={returnKeyType}
            placeholderTextColor={colors.text.placeholder}
            onSubmitEditing={
              returnKeyType === KEY_TYPES.GO ? onSubmitForm : onSubmitEditing
            }
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Input;
