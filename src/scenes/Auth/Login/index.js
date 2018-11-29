// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import Input from 'components/Input/index';
import Button from 'components/Button/index';

import colors from 'global/colors';
import images from 'global/images';
import constants from 'global/constants';
import styles from './styles';

type State = {
  isRegistrationForm: boolean,
  textInputName: string,
  textInputEmail: string,
  textInputPassword: string,
  textInputMobile: string,
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
        backgroundColor: colors.black,
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
  }

  state = {
    isRegistrationForm: false,
    textInputName: '',
    textInputEmail: '',
    textInputPassword: '',
    textInputMobile: '',
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

  render() {
    const {
      state: {
        textInputName,
        textInputEmail,
        textInputPassword,
        textInputMobile,
        isRegistrationForm,
      },
    } = this;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
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
                    onPress={this.onPushButton}
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
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
