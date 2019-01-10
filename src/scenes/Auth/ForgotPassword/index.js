// @flow

import React, { PureComponent } from 'react';
import { Alert, View, Text } from 'react-native';

import { graphql } from 'react-apollo';

import Logo from '~/components/Logo';
import Warning from '~/components/Warning';
import Input from '~/components/Input/index';
import Button from '~/components/Button/index';
import HeaderTitle from '~/components/HeaderTitle';
import HeaderBackButton from '~/components/HeaderBackButton';
import ScrollViewContainer from '~/components/ScrollViewContainer';

import utils from '~/global/utils';
import colors from '~/global/colors';
import Styles from '~/global/styles';
import constants from '~/global/constants';
import { RESET_PASSWORD_MUTATION } from '~/graphql/auth/mutations';

import styles from './styles';
import type { State, Props } from './types';

class ForgotPassword extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: Styles.authHeaderStyleBig,
    headerTitle: HeaderTitle({
      title: constants.forgotPassText.headerTitle,
      color: colors.white,
    }),
    headerLeft: HeaderBackButton({
      onPress: () => navigation.goBack(),
    }),
  });

  constructor(props: Props) {
    super(props);
    this.state = { email: '', warning: false, isRecoveryMailSend: false };
  }

  onChangeField = (field: string, value: string) => {
    this.setState({
      [field]: value,
      warning: false,
    });
  };

  checkValue = () => {
    const { email } = this.state;
    if (!utils.isValid(email, constants.regExp.email)) {
      this.setState({ warning: true });
    }
  };

  onSendRecoveryMail = async () => {
    const { email } = this.state;
    const { mutate } = this.props;
    this.checkValue();
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
    const { email, warning, isRecoveryMailSend } = this.state;

    return (
      <ScrollViewContainer>
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
              fieldRef={(ref) => {
                this.emailRef = ref;
              }}
              isWarning={warning}
              returnKeyType="go"
              keyboardType="email-address"
              type={constants.inputTypes.email}
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
            isDisable={warning}
          />
        )}
        <Warning isVisible={warning} title={constants.errors.login.email} />
      </ScrollViewContainer>
    );
  }
}

export default graphql(RESET_PASSWORD_MUTATION)(ForgotPassword);
