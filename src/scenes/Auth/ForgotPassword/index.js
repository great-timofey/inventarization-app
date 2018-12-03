// @flow

import React, { PureComponent } from 'react';
import { View, Text, Image, Keyboard, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from 'components/Input/index';
import Button from 'components/Button/index';

import colors from 'global/colors';
import assets from 'global/assets';
import constants from 'global/constants';
import styles from './styles';

import type { State, Props } from './types';

const initialState = {
  email: '',
  mobile: '',
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
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.toggleKeyboard
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.toggleKeyboard
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  toggleKeyboard = () =>
    this.setState(({ isKeyboardActive }) => ({
      isKeyboardActive: !isKeyboardActive,
    }));

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
    console.log(email);
    this.setState({
      isRecoveryMailSend: true,
    });
  };

  emailRef: any;

  mobileRef: any;

  keyboardWillShowSub: any;

  keyboardWillHideSub: any;

  render() {
    const { email, mobile, isKeyboardActive, isRecoveryMailSend } = this.state;

    return (
      <View style={styles.wrapper}>
        <KeyboardAwareScrollView
          extraScrollHeight={50}
          scrollEnabled={isKeyboardActive}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
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
                nextRefName="mobileRef"
                fieldRef={ref => {
                  this.emailRef = ref;
                }}
                type={constants.inputTypes.email}
                focusField={this.focusField}
                onChangeText={text => this.onChangeField('email', text)}
              />
            )}
            {!isRecoveryMailSend && (
              <Input
                value={mobile}
                refEl="mobileRef"
                fieldRef={ref => {
                  this.mobileRef = ref;
                }}
                focusField={this.focusField}
                type={constants.inputTypes.mobileNumber}
                placeholder={constants.forgotPassText.placeHolder}
                onChangeText={text => this.onChangeField('mobile', text)}
                onPushButton={this.onSendRecoveryMail}
              />
            )}
            <Text style={styles.text}>
              {!isRecoveryMailSend
                ? constants.forgotPassText.enterData
                : constants.forgotPassText.sendMail}
            </Text>
          </View>
          <Button
            title={
              !isRecoveryMailSend
                ? constants.buttonTitles.restorePass
                : constants.buttonTitles.update
            }
            onPressButton={() => this.onSendRecoveryMail(email)}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default ForgotPassword;
