// @flow

import React, { Component } from 'react';
import TextInputMask from 'react-native-text-input-mask';
import { View, Text, TextInput } from 'react-native';

import colors from 'global/colors';

import type { Props } from './types';
import styles from './styles';

const KEY_TYPES = {
  GO: 'go',
  NEXT: 'next',
};

class Input extends Component<Props> {
  static defaultProps = {
    autoCorrect: false,
    autoCapitalize: 'none',
    returnKeyType: KEY_TYPES.NEXT,
  };

  shouldComponentUpdate(nextProps: Props) {
    const { returnKeyType, value, isWarning } = this.props;
    if (
      nextProps.value !== value ||
      nextProps.returnKeyType !== returnKeyType ||
      nextProps.isWarning !== isWarning
    ) {
      return true;
    }
    return false;
  }

  render() {
    const {
      mask,
      type,
      value,
      isWhite,
      fieldRef,
      children,
      isWarning,
      onSubmitForm,
      returnKeyType,
      onSubmitEditing,
      ...textInputProps
    } = this.props;

    const CustomTextInput: any = mask ? TextInputMask : TextInput;

    return (
      <View
        style={[
          styles.container,
          isWhite && styles.whiteContainer,
          children && styles.withButton,
          isWarning && styles.invalidContainer,
        ]}
      >
        <Text
          style={[styles.inputTitleText, isWhite && styles.inputTitleTextWhite]}
        >
          {type.label}
        </Text>
        <CustomTextInput
          {...textInputProps}
          mask={mask}
          value={value}
          ref={fieldRef}
          style={[styles.input, isWhite && styles.inputWhite]}
          returnKeyType={returnKeyType}
          placeholderTextColor={
            isWhite ? colors.text.placeholderWhite : colors.text.placeholder
          }
          onSubmitEditing={
            returnKeyType === KEY_TYPES.GO ? onSubmitForm : onSubmitEditing
          }
        />
        {children}
      </View>
    );
  }
}

export default Input;
