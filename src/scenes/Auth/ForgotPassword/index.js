// @flow

import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from 'components/Input/index';
import Button from 'components/Button/index';

import utils from 'global/utils';
import colors from 'global/colors';
import assets from 'global/assets';
import constants from 'global/constants';
import styles from './styles';

import type { State, Props } from './types';

const initialState = {
  email: '',
  isKeyboardActive: false,
  isRecoveryMailSend: false,
};

class ForgotPassword extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: {
      height: 100,
      borderBottomWidth: 0,
      backgroundColor: colors.backGroundBlack,
    },
    headerTitle: (
      <View>
        <Text style={styles.headerTitle} numberOfLines={2}>
          {constants.forgotPassText.headerTitle}
        </Text>
      </View>
    ),
    headerLeft: (
      <TouchableOpacity
        style={styles.headerLeft}
        onPress={() => navigation.goBack()}
      >
        <Image source={assets.headerBackArrow} />
      </TouchableOpacity>
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

  onSendRecoveryMail = (email: string) => {
    if (utils.validateFunction(email, constants.inputTypes.email)) {
      this.setState({
        isRecoveryMailSend: true,
      });
    }
  };

  emailRef: any;

  mobileRef: any;

  render() {
    const { email, isKeyboardActive, isRecoveryMailSend } = this.state;

    return (
      <View style={styles.wrapper}>
        <KeyboardAwareScrollView
          scrollEnabled={isKeyboardActive}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          onKeyboardWillShow={this.toggleShowKeyboard}
          onKeyboardWillHide={this.toggleHideKeyboard}
        >
          {!isRecoveryMailSend && (
            <View style={styles.logo}>
              <Image source={assets.grayLogo} />
            </View>
          )}
          <View
            style={[
              styles.formContainer,
              isRecoveryMailSend && styles.formContainerCenter,
            ]}
          >
            {!isRecoveryMailSend && (
              <Input
                value={email}
                refEl="emailRef"
                fieldRef={ref => {
                  this.emailRef = ref;
                }}
                returnKeyType="go"
                keyboardType="email-address"
                focusField={this.focusField}
                type={constants.inputTypes.email}
                onPushButton={() => this.onSendRecoveryMail(email)}
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
              onPressButton={() => this.onSendRecoveryMail(email)}
            />
          )}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default ForgotPassword;
