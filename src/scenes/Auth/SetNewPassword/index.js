// @flow

import React, { PureComponent } from 'react';
import { View } from 'react-native';

import Logo from 'components/Logo';
import Input from 'components/Input/index';
import Button from 'components/Button/index';
import HeaderTitle from 'components/HeaderTitle';
import ScrollViewContainer from 'components/KeyboardAwareScrollView';

import utils from 'global/utils';
import Styles from 'global/styles';
import colors from 'global/colors';
import constants from 'global/constants';

import styles from './styles';

import type { State, Props } from './types';

class SetNewPassword extends PureComponent<Props, State> {
  static navigationOptions = () => ({
    headerStyle: Styles.authHeaderStyleBig,
    headerTitle: HeaderTitle({
      title: constants.setNewPassword.create,
      color: colors.white,
    }),
  });

  constructor(props: Props) {
    super(props);
    this.state = { password: '', confirmPassword: '', warnings: [] };
  }

  onChangeField = (field: string, value: string) => {
    this.setState({
      [field]: value,
      warnings: [],
    });
  };

  focusConfirmPassInput = () => {
    const { confirmPasswordRef } = this;
    if (confirmPasswordRef) {
      confirmPasswordRef.focus();
    }
  };

  checkValue = () => {
    const { password, confirmPassword } = this.state;
    const warnings = [];
    if (!utils.isValid(password, constants.regExp.password)) {
      warnings.push('password');
    }
    if (!utils.isValid(confirmPassword, constants.regExp.password)) {
      warnings.push('confirmPassword');
    }
    if (password !== confirmPassword) {
      warnings.push('notMatch');
    }
    this.setState({ warnings });
  };

  checkForErrors = () => {
    const { warnings } = this.state;
    if (warnings.length) return true;
    return false;
  };

  onSubmitForm = (password: string, confirmPassword: string) => {
    this.checkValue();
    if (utils.isValidPassword(password, confirmPassword)) {
      alert('click');
    }
  };

  passwordRef: any;

  confirmPasswordRef: any;

  render() {
    const { password, confirmPassword, warnings } = this.state;

    return (
      <ScrollViewContainer>
        <Logo isSmall={false} />
        <View style={styles.formContainer}>
          <Input
            value={password}
            fieldRef={ref => {
              this.passwordRef = ref;
            }}
            secureTextEntry
            isWarning={warnings.includes('password')}
            type={constants.inputTypes.setNewPassword}
            onSubmitEditing={this.focusConfirmPassInput}
            onChangeText={text => this.onChangeField('password', text)}
          />
          <Input
            value={confirmPassword}
            fieldRef={ref => {
              this.confirmPasswordRef = ref;
            }}
            secureTextEntry
            returnKeyType="go"
            type={constants.inputTypes.confirmPassword}
            isWarning={warnings.includes('confirmPassword')}
            onSubmitForm={() => this.onSubmitForm(password, confirmPassword)}
            onChangeText={text => this.onChangeField('confirmPassword', text)}
          />
        </View>
        <Button
          title={constants.buttonTitles.setNewPass}
          onPress={() => this.onSubmitForm(password, confirmPassword)}
          isDisable={this.checkForErrors()}
        />
      </ScrollViewContainer>
    );
  }
}

export default SetNewPassword;
