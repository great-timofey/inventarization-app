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
    const {
      value,
      isWarning,
      returnKeyType,
      customWarning,
      secureTextEntry,
      containerCallback,
    } = this.props;
    if (
      nextProps.value !== value
      || nextProps.isWarning !== isWarning
      || nextProps.customWarning !== customWarning
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
      customKey,
      isWarning,
      isMultiline,
      onSubmitForm,
      customWarning,
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
            isMultiline && styles.multilineContainer,
            (isWarning || customWarning) && styles.invalidContainer,
            isBackgroundTransparent && styles.transparentBackgroundContainer,
            showWarningInTitle && isWarning && styles.itemFormErrorContainer,
            isWhite && (isWarning || customWarning) && styles.invalidWhiteContainer,
          ]}
        >
          <Text
            style={[
              styles.inputTitleText,
              isWhite && styles.inputTitleTextWhite,
              (isWarning || customWarning) && styles.inputErrorText,
              showWarningInTitle && isWarning && styles.inputErrorText,
              (isWarning || customWarning) && isWhite && styles.inputErrorText,
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
        {!showWarningInTitle && (
          <Warning
            isVisible={isWarning || !!customWarning}
            title={isWarning ? type.warning : customWarning}
          />
        )}
      </Wrapper>
    );
  }
}

export default Input;
