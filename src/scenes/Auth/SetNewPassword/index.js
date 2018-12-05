// @flow

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Logo from 'components/Logo';
import Input from 'components/Input/index';
import Button from 'components/Button/index';
import HeaderTitle from 'components/HeaderTitle';

import utils from 'global/utils';
import Styles from 'global/styles';
import constants from 'global/constants';

import styles from './styles';

import type { State, Props } from './types';

class SetNewPassword extends PureComponent<Props, State> {
  static navigationOptions = () => ({
    headerStyle: Styles.authHeaderStyle,
    headerTitle: HeaderTitle({ title: constants.setNewPassword.create }),
  });

  constructor(props: Props) {
    super(props);
    this.state = { password: '', confirmPassword: '' };
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

  onSubmitForm = (password: string, confirmPassword: string) => {
    if (utils.isValidPassword(password, confirmPassword)) {
      alert('click');
    }
  };

  passwordRef: any;

  confirmPasswordRef: any;

  render() {
    const { password, confirmPassword } = this.state;
    return (
      <View style={styles.wrapper}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <Logo isSmall={false} />
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
              onSubmitForm={() => this.onSubmitForm(password, confirmPassword)}
              onChangeText={text => this.onChangeField('confirmPassword', text)}
            />
          </View>
          <Button
            title={constants.buttonTitles.setNewPass}
            onPress={() => this.onSubmitForm(password, confirmPassword)}
            isDisable={!utils.isValidPassword(password, confirmPassword)}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default SetNewPassword;
