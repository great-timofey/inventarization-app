// @flow

import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from 'components/Input/index';
import Button from 'components/Button/index';

import colors from 'global/colors';
import assets from 'global/assets';
import constants from 'global/constants';
import utils from 'global/utils';
import styles from './styles';

import type { State, Props } from './types';

const initialState = {
  password: '',
  confirmPassword: '',
  isKeyboardActive: false,
};

class SetNewPassword extends PureComponent<Props, State> {
  static navigationOptions = () => ({
    headerStyle: {
      height: 100,
      borderBottomWidth: 0,
      backgroundColor: colors.backGroundBlack,
    },
    headerTitle: (
      <View>
        <Text style={styles.headerTitle} numberOfLines={2}>
          {constants.setNewPassword.create}
        </Text>
      </View>
    ),
  });

  constructor(props: Props) {
    super(props);
    this.state = { ...initialState };
  }

  toggleShowKeyboard = () => {
    this.setState({
      isKeyboardActive: true,
    });
  };

  toggleHideKeyboard = () => {
    this.setState({
      isKeyboardActive: false,
    });
  };

  onChangeField = (field: string, value: string) => {
    this.setState({
      [field]: value,
    });
  };

  focusField = (key: string) => {
    const t = this[key];
    if (t) t.focus();
  };

  onPushButton = (password: string, confirmPassword: string) => {
    if (
      password &&
      confirmPassword &&
      password === confirmPassword &&
      utils.validateFunction(password, constants.inputTypes.password) &&
      utils.validateFunction(confirmPassword, constants.inputTypes.password)
    ) {
      alert('click');
    }
    return null;
  };

  passwordRef: any;

  confirmPasswordRef: any;

  render() {
    const { password, confirmPassword, isKeyboardActive } = this.state;
    return (
      <View style={styles.wrapper}>
        <KeyboardAwareScrollView
          scrollEnabled={isKeyboardActive}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          onKeyboardWillShow={this.toggleShowKeyboard}
          onKeyboardWillHide={this.toggleHideKeyboard}
        >
          <View style={styles.logo}>
            <Image source={assets.grayLogo} />
          </View>
          <View style={styles.formContainer}>
            <Input
              value={password}
              refEl="passwordRef"
              nextRefName="confirmPasswordRef"
              fieldRef={ref => {
                this.passwordRef = ref;
              }}
              secureTextEntry
              type={constants.inputTypes.setNewPassword}
              focusField={this.focusField}
              onChangeText={text => this.onChangeField('password', text)}
            />
            <Input
              value={confirmPassword}
              refEl="confirmPasswordRef"
              fieldRef={ref => {
                this.confirmPasswordRef = ref;
              }}
              secureTextEntry
              focusField={this.focusField}
              returnKeyType="go"
              type={constants.inputTypes.confirmPassword}
              onPushButton={() => this.onPushButton(password, confirmPassword)}
              onChangeText={text => this.onChangeField('confirmPassword', text)}
            />
          </View>
          <Button
            title={constants.buttonTitles.setNewPass}
            onPressButton={() => this.onPushButton(password, confirmPassword)}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default SetNewPassword;
