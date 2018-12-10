// @flow

import React, { PureComponent } from 'react';
import { Alert, View, Text } from 'react-native';

import { graphql } from 'react-apollo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Logo from 'components/Logo';
import Input from 'components/Input/index';
import Button from 'components/Button/index';
import Warning from 'components/Warning';
import HeaderTitle from 'components/HeaderTitle';
import HeaderBackbutton from 'components/HeaderBackButton';

import utils from 'global/utils';
import Styles from 'global/styles';
import constants from 'global/constants';
import { RESET_PASSWORD_MUTATION } from 'graphql/auth/mutations';

import styles from './styles';
import type { State, Props } from './types';

class ForgotPassword extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: Styles.authHeaderStyle,
    headerTitle: HeaderTitle({ title: constants.forgotPassText.headerTitle }),
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

  onSendRecoveryMail = async () => {
    const { email } = this.state;
    const { mutate } = this.props;

    if (utils.isValid(email, constants.regExp.email)) {
      try {
        await mutate({ variables: { email } });

        this.setState({
          isRecoveryMailSend: true,
        });
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  };

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
              isDisable={!utils.isValid(email, constants.regExp.email)}
            />
          )}
        </KeyboardAwareScrollView>
        <Warning
          isVisible={utils.isWarning(email, constants.inputTypes.email)}
          isEmail
        />
      </View>
    );
  }
}

export default graphql(RESET_PASSWORD_MUTATION)(ForgotPassword);
