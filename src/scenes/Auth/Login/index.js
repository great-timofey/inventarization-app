// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from 'components/Input/index';
import Button from 'components/Button/index';

import colors from 'global/colors';
import images from 'global/images';
import constants from 'global/constants';
import styles from './styles';

type State = {
  textInputName: string,
  textInputEmail: string,
  textInputMobile: string,
  isKeyboardActive: boolean,
  textInputPassword: string,
  isRegistrationForm: boolean,
};

type Props = {
  navigation: any,
};

class Login extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: { navigation: any }) => {
    const { state } = navigation;
    const isRegistrationForm = state.params && state.params.isRegistrationForm;
    return {
      headerStyle: {
        backgroundColor: colors.backGroundBlack,
        borderBottomWidth: 0,
      },
      headerLeft: (
        <TouchableWithoutFeedback
          onPress={() => state.params.onPushLeftHeaderButton()}
        >
          <View
            style={
              isRegistrationForm
                ? styles.inactiveHeaderButton
                : styles.activeHeaderButton
            }
          >
            <Text
              style={
                isRegistrationForm
                  ? styles.inactiveHeaderButtonText
                  : styles.activeHeaderButtonText
              }
            >
              Регистрация
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ),
      headerRight: (
        <TouchableWithoutFeedback
          onPress={() => state.params.onPushRightHeaderButton()}
        >
          <View
            style={
              isRegistrationForm
                ? styles.activeHeaderButton
                : styles.inactiveHeaderButton
            }
          >
            <Text
              style={
                isRegistrationForm
                  ? styles.activeHeaderButtonText
                  : styles.inactiveHeaderButtonText
              }
            >
              Вход
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ),
    };
  };

  constructor(props: Props) {
    super(props);
    const {
      props: { navigation },
    } = this;
    navigation.setParams({
      isRegistrationForm: false,
      onPushLeftHeaderButton: this.onPushLeftHeaderButton,
      onPushRightHeaderButton: this.onPushRightHeaderButton,
    });
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide
    );
  }

  state = {
    isKeyboardActive: false,
    isRegistrationForm: false,
    textInputName: '',
    textInputEmail: '',
    textInputPassword: '',
    textInputMobile: '',
  };

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = () => {
    this.setState({ isKeyboardActive: true });
  };

  keyboardWillHide = () => {
    this.setState({ isKeyboardActive: false });
  };

  onChangeName = (value: string) => {
    this.setState({
      textInputName: value,
    });
  };

  onChangeEmail = (value: string) => {
    this.setState({
      textInputEmail: value,
    });
  };

  onChangePassword = (value: string) => {
    this.setState({
      textInputPassword: value,
    });
  };

  onChangeMobile = (value: string) => {
    this.setState({
      textInputMobile: value,
    });
  };

  onPushLeftHeaderButton = () => {
    const {
      props: { navigation },
    } = this;
    navigation.setParams({ isRegistrationForm: true });
    this.setState({
      isRegistrationForm: true,
      textInputEmail: '',
      textInputPassword: '',
    });
    Keyboard.dismiss();
  };

  onPushRightHeaderButton = () => {
    const {
      props: { navigation },
    } = this;
    navigation.setParams({ isRegistrationForm: false });
    this.setState({
      isRegistrationForm: false,
      textInputName: '',
      textInputEmail: '',
      textInputPassword: '',
      textInputMobile: '',
    });
    Keyboard.dismiss();
  };

  focusNextField = (type: string) => {
    const {
      state: { isRegistrationForm },
    } = this;
    if (isRegistrationForm) {
      if (type === constants.inputTypes.name) {
        this.textInputEmailRef.ref.focus();
      } else if (type === constants.inputTypes.email) {
        this.textInputPasswordRef.ref.focus();
      } else if (type === constants.inputTypes.password) {
        this.textInputMobileRef.ref.focus();
      }
    } else {
      this.textInputPasswordRef.ref.focus();
    }
  };

  onPushButton = () => {
    alert('Click');
  };

  textInputNameRef: any;

  textInputEmailRef: any;

  textInputPasswordRef: any;

  textInputMobileRef: any;

  keyboardWillShowSub: any;

  keyboardWillHideSub: any;

  render() {
    const {
      state: {
        textInputName,
        textInputEmail,
        textInputMobile,
        isKeyboardActive,
        textInputPassword,
        isRegistrationForm,
      },
    } = this;

    return (
      <View style={styles.wrapper}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          scrollEnabled={isKeyboardActive}
          extraScrollHeight={50}
        >
          <View style={styles.logo}>
            <Image style={styles.logoImage} source={images.logo} />
            <Image source={images.appName} />
          </View>
          <View style={styles.formContainer}>
            {isRegistrationForm && (
              <Input
                onPushButton={this.onPushButton}
                focusNextField={this.focusNextField}
                ref={ref => {
                  this.textInputNameRef = ref;
                }}
                state={isRegistrationForm}
                type={constants.inputTypes.name}
                value={textInputName}
                onChangeText={() => this.onChangeName}
              />
            )}
            <Input
              onPushButton={this.onPushButton}
              focusNextField={this.focusNextField}
              ref={ref => {
                this.textInputEmailRef = ref;
              }}
              state={isRegistrationForm}
              type={constants.inputTypes.email}
              value={textInputEmail}
              onChangeText={() => this.onChangeEmail}
            />
            <Input
              onPushButton={this.onPushButton}
              focusNextField={this.focusNextField}
              ref={ref => {
                this.textInputPasswordRef = ref;
              }}
              state={isRegistrationForm}
              type={constants.inputTypes.password}
              value={textInputPassword}
              onChangeText={() => this.onChangePassword}
            />
            {isRegistrationForm && (
              <Input
                onPushButton={this.onPushButton}
                focusNextField={this.focusNextField}
                ref={ref => {
                  this.textInputMobileRef = ref;
                }}
                state={isRegistrationForm}
                type={constants.inputTypes.mobileNumber}
                value={textInputMobile}
                onChangeText={() => this.onChangeMobile}
              />
            )}
            {!isRegistrationForm && (
              <View style={styles.additionalButtons}>
                <TouchableWithoutFeedback>
                  <View>
                    <Text
                      onPress={this.onPushButton}
                      style={styles.additionalButtonsText}
                    >
                      Забыли пароль?
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <View>
                    <Text
                      onPress={this.onPushLeftHeaderButton}
                      style={styles.additionalButtonsText}
                    >
                      Регистрация
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
          </View>
          <Button
            onPressButton={this.onPushButton}
            title={
              isRegistrationForm
                ? constants.buttonTitles.reg
                : constants.buttonTitles.login
            }
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default Login;
