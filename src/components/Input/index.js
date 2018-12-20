// @flow

import React, { Component, Fragment } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import TextInputMask from 'react-native-text-input-mask';

import colors from '~/global/colors';
import Warning from '~/components/Warning';

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
      nextProps.value !== value
      || nextProps.returnKeyType !== returnKeyType
      || nextProps.isWarning !== isWarning
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
      customKey,
      onSubmitForm,
      returnKeyType,
      onSubmitEditing,
      containerCallback,
      ...textInputProps
    } = this.props;

    const CustomTextInput: any = mask ? TextInputMask : TextInput;
    const Wrapper: any = containerCallback ? TouchableOpacity : View;

    return (
      <Wrapper
        onPress={containerCallback ? () => containerCallback(customKey) : null}
        style={containerCallback ? styles.overflowView : null}
      >
        <View
          pointerEvents={containerCallback ? 'none' : null}
          style={[
            styles.container,
            isWhite && styles.whiteContainer,
            children && styles.withButton,
            isWarning && styles.invalidContainer,
          ]}
        >
          <Text style={[styles.inputTitleText, isWhite && styles.inputTitleTextWhite]}>
            {type.label}
          </Text>
          <CustomTextInput
            {...textInputProps}
            mask={mask}
            ref={fieldRef}
            value={value}
            textContentType="none"
            returnKeyType={returnKeyType}
            style={[styles.input, isWhite && styles.inputWhite]}
            placeholderTextColor={isWhite ? colors.text.placeholderWhite : colors.text.placeholder}
            onSubmitEditing={returnKeyType === KEY_TYPES.GO ? onSubmitForm : onSubmitEditing}
          />
          {children}
        </View>
        <Warning isVisible={isWarning || false} title={type.warning} />
      </Wrapper>
    );
  }
}

export default Input;
