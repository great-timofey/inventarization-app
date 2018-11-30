// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from 'components/Input/index';
import Button from 'components/Button/index';

import colors from 'global/colors';
import assets from 'global/assets';
import constants from 'global/constants';
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

const headerButton = ({
  isActive,
  onPress,
  name,
}: {
  isActive: boolean,
  onPress: Function,
  name: string,
}) => (
  <TouchableWithoutFeedback onPress={isActive ? onPress : null}>
    <View style={[styles.buttonHeader, !isActive && styles.inactiveHeaderBtn]}>
      <Text
        style={[styles.buttonText, !isActive && styles.inactiveHeaderBtnText]}
      >
        {name}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

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
      headerLeft: headerButton({
        name: 'Регистрация',
        isActive: !isRegForm,
        onPress: () => state.params.onPushHeaderButton(isRegForm),
      }),
      headerRight: headerButton({
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

    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.toggleKeyboard
    );

    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.toggleKeyboard
    );
    this.state = { ...initialState };
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

  onPushHeaderButton = (isRegForm: boolean) => {
    const { navigation } = this.props;
    const { isKeyboardActive } = this.state;
    navigation.setParams({ isRegForm: !isRegForm });
    this.setState({
      ...initialState,
      isRegForm: !isRegForm,
    });
    if (isKeyboardActive) {
      this.toggleKeyboard();
    }
    Keyboard.dismiss();
  };

  focusNextField = (type: string, key: string) => {
    if (this[key]) this[key].focus();
  };

  onPushButton = () => {
    console.log('Click');
  };

  nameRef: any;

  emailRef: any;

  passwordRef: any;

  mobileRef: any;

  keyboardWillShowSub: any;

  keyboardWillHideSub: any;

  render() {
    const {
      name,
      email,
      mobile,
      password,
      isRegForm,
      isKeyboardActive,
    } = this.state;

    return (
      <View style={styles.wrapper}>
        <StatusBar barStyle="light-content" />
        <KeyboardAwareScrollView
          extraScrollHeight={50}
          scrollEnabled={isKeyboardActive}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
        >
          <View style={styles.logo}>
            <Image style={styles.logoImage} source={assets.logologin} />
            <Image source={assets.appName} />
          </View>
          <View style={styles.formContainer}>
            {isRegForm && (
              <Input
                value={name}
                nextRefName="emailRef"
                fieldRef={ref => {
                  this.nameRef = ref;
                }}
                state={isRegForm}
                type={constants.inputTypes.name}
                focusNextField={this.focusNextField}
                onChangeText={text => this.onChangeField('name', text)}
              />
            )}
            <Input
              value={email}
              nextRefName="passwordRef"
              fieldRef={ref => {
                this.emailRef = ref;
              }}
              state={isRegForm}
              type={constants.inputTypes.email}
              focusNextField={this.focusNextField}
              onChangeText={text => this.onChangeField('email', text)}
            />
            <Input
              value={password}
              nextRefName="mobileRef"
              fieldRef={ref => {
                this.passwordRef = ref;
              }}
              state={isRegForm}
              onPushButton={this.onPushButton}
              focusNextField={this.focusNextField}
              type={constants.inputTypes.password}
              onChangeText={text => this.onChangeField('password', text)}
            />
            {isRegForm && (
              <Input
                value={mobile}
                fieldRef={ref => {
                  this.mobileRef = ref;
                }}
                state={isRegForm}
                onPushButton={this.onPushButton}
                focusNextField={this.focusNextField}
                type={constants.inputTypes.mobileNumber}
                onChangeText={text => this.onChangeField('mobile', text)}
              />
            )}
            {!isRegForm && (
              <View style={styles.additionalButtons}>
                <AdditionalButton
                  onPress={this.onPushButton}
                  title={constants.buttonTitles.forgotPassword}
                />
                <AdditionalButton
                  onPress={this.onPushButton}
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
            onPressButton={this.onPushButton}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default Login;
