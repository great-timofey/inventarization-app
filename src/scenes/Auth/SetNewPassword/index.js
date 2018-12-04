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

  onChangeField = (field: string, value: string) => {
    this.setState({
      [field]: value,
    });
  };

  focusField = (ref: Object) => {
    if (ref) ref.focus();
  };

  focusConfirmPassInput = () => {
    const { confirmPasswordRef } = this;
    if (confirmPasswordRef) {
      confirmPasswordRef.focus();
    }
  };

  onPushButton = (password: string, confirmPassword: string) => {
    if (
      password &&
      confirmPassword &&
      password === confirmPassword &&
      utils.validateFunction(password, constants.inputTypes.password) &&
      utils.validateFunction(confirmPassword, constants.inputTypes.password)
    ) {
      return null;
    }
    return null;
  };

  passwordRef: any;

  confirmPasswordRef: any;

  render() {
    const { password, confirmPassword } = this.state;
    return (
      <View style={styles.wrapper}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <View style={styles.logo}>
            <Image source={assets.grayLogo} />
          </View>
          <View style={styles.formContainer}>
            <Input
              value={password}
              fieldRef={ref => {
                this.passwordRef = ref;
              }}
              secureTextEntry
              onSubmitEditing={this.focusConfirmPassInput}
              type={constants.inputTypes.setNewPassword}
              focusField={() => this.focusField(this.passwordRef)}
              onChangeText={text => this.onChangeField('password', text)}
            />
            <Input
              value={confirmPassword}
              fieldRef={ref => {
                this.confirmPasswordRef = ref;
              }}
              secureTextEntry
              focusField={() => this.focusField(this.confirmPasswordRef)}
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
