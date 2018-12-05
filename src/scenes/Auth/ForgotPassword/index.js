// @flow

import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Logo from 'components/Logo';
import Input from 'components/Input/index';
import Button from 'components/Button/index';
import EmailError from 'components/EmailError';
import HeaderTitle from 'components/HeaderTitle';
import HeaderBackbutton from 'components/HeaderBackButton';

import utils from 'global/utils';
import Styles from 'global/styles';
import constants from 'global/constants';

import styles from './styles';
import type { State, Props } from './types';

class ForgotPassword extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: Styles.authHeaderStyle,
    headerTitle: HeaderTitle(),
    headerLeft: HeaderBackbutton({
      onPress: () => navigation.goBack(),
    }),
  });

  constructor(props: Props) {
    super(props);
    this.state = { email: '', isRecoveryMailSend: false };
  }

  onChangeField = (field: string, value: string) => {
    this.setState({
      [field]: value,
    });
  };

  focusField = (ref: Object) => {
    if (ref) ref.focus();
  };

  onSendRecoveryMail = () => {
    const { email } = this.state;
    if (utils.isValid(email, constants.inputTypes.email)) {
      this.setState({
        isRecoveryMailSend: true,
      });
    }
  };

  isEmailEmpty = (value: string) => value === '';

  emailRef: any;

  render() {
    const { email, isRecoveryMailSend } = this.state;

    return (
      <View style={styles.wrapper}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          {!isRecoveryMailSend && <Logo isSmall={false} />}
          <View
            style={[
              styles.formContainer,
              isRecoveryMailSend && styles.formContainerCenter,
            ]}
          >
            {!isRecoveryMailSend && (
              <Input
                value={email}
                fieldRef={ref => {
                  this.emailRef = ref;
                }}
                returnKeyType="go"
                keyboardType="email-address"
                type={constants.inputTypes.email}
                focusField={() => this.focusField(this.emailRef)}
                onSubmitForm={this.onSendRecoveryMail}
                onChangeText={text => this.onChangeField('email', text)}
              />
            )}
            <Text style={styles.text}>
              {!isRecoveryMailSend
                ? constants.forgotPassText.enterEmail
                : constants.forgotPassText.sendMail}
            </Text>
          </View>
          {!isRecoveryMailSend && (
            <Button
              title={constants.buttonTitles.restorePass}
              onPress={this.onSendRecoveryMail}
              isDisable={!utils.isValid(email, constants.inputTypes.email)}
            />
          )}
        </KeyboardAwareScrollView>
        {!this.isEmailEmpty(email) &&
          !utils.isValid(email, constants.inputTypes.email) && <EmailError />}
      </View>
    );
  }
}

export default ForgotPassword;
