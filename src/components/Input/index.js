// @flow

import React, { Component } from 'react';
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
    const { returnKeyType, value, isWarning, containerCallback, secureTextEntry } = this.props;
    if (
      nextProps.value !== value
      || nextProps.isWarning !== isWarning
      || nextProps.returnKeyType !== returnKeyType
      || nextProps.secureTextEntry !== secureTextEntry
      || nextProps.containerCallback !== containerCallback
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
      isMultiline,
      onSubmitForm,
      returnKeyType,
      onSubmitEditing,
      containerCallback,
      showWarningInTitle,
      isBackgroundTransparent,
      ...textInputProps
    } = this.props;

    const CustomTextInput: any = mask ? TextInputMask : TextInput;
    const Wrapper: any = containerCallback ? TouchableOpacity : View;

    return (
      <Wrapper
        activeOpacity={1}
        style={containerCallback ? styles.overflowView : null}
        onPress={containerCallback ? () => containerCallback(customKey) : null}
      >
        <View
          pointerEvents={containerCallback ? 'none' : undefined}
          style={[
            styles.container,
            children && styles.withButton,
            isWhite && styles.whiteContainer,
            isWarning && styles.invalidContainer,
            isMultiline && styles.multilineContainer,
            isWhite && isWarning && styles.invalidWhiteContainer,
            isBackgroundTransparent && styles.transparentBackgroundContainer,
            showWarningInTitle && isWarning && styles.itemFormErrorContainer,
          ]}
        >
          <Text
            style={[
              styles.inputTitleText,
              isWarning && styles.inputErrorText,
              isWhite && styles.inputTitleTextWhite,
              isWarning && isWhite && styles.inputErrorText,
              showWarningInTitle && isWarning && styles.inputErrorText,
            ]}
          >
            {showWarningInTitle && isWarning ? type.warning : type.label}
          </Text>
          <CustomTextInput
            {...textInputProps}
            mask={mask}
            value={value}
            ref={fieldRef}
            textContentType="none"
            multiline={isMultiline}
            returnKeyType={returnKeyType}
            onSubmitEditing={returnKeyType === KEY_TYPES.GO ? onSubmitForm : onSubmitEditing}
            placeholderTextColor={isWhite ? colors.text.placeholderWhite : colors.text.placeholder}
            style={[
              styles.input,
              isWhite && styles.inputWhite,
              isMultiline && styles.multilineInput,
            ]}
          />
          {children}
        </View>
        {!showWarningInTitle && <Warning isVisible={isWarning} title={type.warning} />}
      </Wrapper>
    );
  }
}

export default Input;
