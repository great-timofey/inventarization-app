// @flow

import React, { PureComponent } from 'react';
import { View, Text, Image, Keyboard, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from 'components/Input/index';
import Button from 'components/Button/index';
import HeaderButton from 'components/HeaderButton';
import * as SCENE_NAMES from 'navigation/scenes';

import colors from 'global/colors';
import assets from 'global/assets';
import constants from 'global/constants';
import utils from 'global/utils';
import styles from './styles';

type State = {
  name: string,
  email: string,
  mobile: string,
  password: string,
  isKeyboardActive: boolean,
  isRegForm: boolean,
};

type Props = {
  navigation: any,
};

const initialState = {
  name: '',
  email: '',
  mobile: '',
  password: '',
  isKeyboardActive: false,
  isRegForm: false,
};

const AdditionalButton = ({
  title,
  onPress,
}: {
  title: string,
  onPress: Function,
}) => (
  <Text onPress={onPress} style={styles.additionalButtonsText}>
    {title}
  </Text>
);

class Login extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: { navigation: any }) => {
    const { state } = navigation;
    const isRegForm = state.params && state.params.isRegForm;

    return {
      headerStyle: {
        marginTop: 15,
        backgroundColor: colors.backGroundBlack,
        borderBottomWidth: 0,
      },
      headerLeft: HeaderButton({
        name: 'Регистрация',
        isActive: !isRegForm,
        onPress: () => state.params.onPushHeaderButton(isRegForm),
      }),
      headerRight: HeaderButton({
        name: 'Вход',
        isActive: isRegForm,
        onPress: () => state.params.onPushHeaderButton(isRegForm),
      }),
    };
  };

  constructor(props: Props) {
    super(props);
    const { navigation } = this.props;

    navigation.setParams({
      isRegForm: false,
      onPushHeaderButton: this.onPushHeaderButton,
    });
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

  onPushHeaderButton = (isRegForm: boolean) => {
    const { navigation } = this.props;
    const { isKeyboardActive } = this.state;
    navigation.setParams({ isRegForm: !isRegForm });
    this.setState({
      ...initialState,
      isRegForm: !isRegForm,
    });
    if (isKeyboardActive) {
      this.toggleHideKeyboard();
    }
    Keyboard.dismiss();
  };

  onPushEnterButton = (email: string, password: string) => {
    if (
      email &&
      password &&
      utils.validateFunction(email, constants.inputTypes.email) &&
      utils.validateFunction(password, constants.inputTypes.password)
    ) {
      return null;
    }
    return null;
  };

  onPushRegButton = (name: string, email: string, password: string) => {
    if (
      name &&
      email &&
      password &&
      utils.validateFunction(email, constants.inputTypes.email) &&
      utils.validateFunction(password, constants.inputTypes.password)
    ) {
      return null;
    }
    return null;
  };

  focusField = (key: string) => {
    const t = this[key];
    if (t) t.focus();
  };

  nameRef: any;

  emailRef: any;

  passwordRef: any;

  mobileRef: any;

  render() {
    const {
      name,
      email,
      mobile,
      password,
      isRegForm,
      isKeyboardActive,
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.wrapper}>
        <StatusBar barStyle="light-content" />
        <KeyboardAwareScrollView
          enableResetScrollToCoords
          scrollEnabled={isKeyboardActive}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          onKeyboardWillShow={this.toggleShowKeyboard}
          onKeyboardWillHide={this.toggleHideKeyboard}
        >
          <View style={styles.logo}>
            <Image style={styles.logoImage} source={assets.logologin} />
            <Image source={assets.appName} />
          </View>
          <View style={styles.formContainer}>
            {isRegForm && (
              <Input
                value={name}
                refEl="nameRef"
                nextRefName="emailRef"
                fieldRef={ref => {
                  this.nameRef = ref;
                }}
                state={isRegForm}
                type={constants.inputTypes.name}
                focusField={this.focusField}
                onChangeText={text => this.onChangeField('name', text)}
              />
            )}
            <Input
              value={email}
              refEl="emailRef"
              fieldRef={ref => {
                this.emailRef = ref;
              }}
              state={isRegForm}
              nextRefName="passwordRef"
              keyboardType="email-address"
              focusField={this.focusField}
              type={constants.inputTypes.email}
              onChangeText={text => this.onChangeField('email', text)}
            />
            <Input
              value={password}
              refEl="passwordRef"
              fieldRef={ref => {
                this.passwordRef = ref;
              }}
              secureTextEntry
              nextRefName="mobileRef"
              focusField={this.focusField}
              onPushButton={() => this.onPushEnterButton(email, password)}
              type={constants.inputTypes.password}
              keyboardType="numbers-and-punctuation"
              returnKeyType={!isRegForm ? 'go' : null}
              onChangeText={text => this.onChangeField('password', text)}
            />
            {isRegForm && (
              <Input
                value={mobile}
                refEl="mobileRef"
                returnKeyType="go"
                onPushButton={() => this.onPushRegButton(name, email, password)}
                fieldRef={ref => {
                  this.mobileRef = ref;
                }}
                focusField={this.focusField}
                keyboardType="numbers-and-punctuation"
                type={constants.inputTypes.mobileNumber}
                onChangeText={text => this.onChangeField('mobile', text)}
              />
            )}
            {!isRegForm && (
              <View style={styles.additionalButtons}>
                <AdditionalButton
                  onPress={() =>
                    navigation.navigate(SCENE_NAMES.ForgotPasswordSceneName)
                  }
                  title={constants.buttonTitles.forgotPassword}
                />
                <AdditionalButton
                  onPress={() =>
                    navigation.state.params.onPushHeaderButton(isRegForm)
                  }
                  title={constants.buttonTitles.registration}
                />
              </View>
            )}
          </View>
          <Button
            title={
              isRegForm
                ? constants.buttonTitles.reg
                : constants.buttonTitles.login
            }
            onPressButton={
              isRegForm
                ? () => this.onPushRegButton(name, email, password)
                : () => this.onPushEnterButton(email, password)
            }
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default Login;
