// @flow

import React, { PureComponent } from 'react';
import { View, Text, Image, Keyboard, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from 'components/Input/index';
import Button from 'components/Button/index';
import HeaderButton from 'components/HeaderButton';
import PickPhotoModal from 'components/PickPhotoModal';

import utils from 'global/utils';
import colors from 'global/colors';
import assets from 'global/assets';
import * as SCENE_NAMES from 'navigation/scenes';
import constants from 'global/constants';
import styles from './styles';
import type { Props, State } from './types';

const initialState = {
  name: '',
  email: '',
  mobile: '',
  password: '',
  isRegForm: false,
  isModalVisible: false,
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

  toggleModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };

  handleOpenCamera = () => {
    const { navigation } = this.props;
    this.toggleModal();
    navigation.navigate(SCENE_NAMES.CameraSceneName, {
      setPhotoUriCallback: this.setPhotoUriCallback,
    });
  };

  setPhotoUriCallback = (uri: string) => {
    const { navigation } = this.props;
    navigation.setParams({ uri });
  };

  onChangeField = (field: string, value: string) => {
    this.setState({
      [field]: value,
    });
  };

  onPushHeaderButton = (isRegForm: boolean) => {
    const { navigation } = this.props;
    navigation.setParams({ isRegForm: !isRegForm });
    this.setState({
      ...initialState,
      isRegForm: !isRegForm,
    });
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

  focusField = (ref: Object) => {
    if (ref) ref.focus();
  };

  focusEmailInput = () => {
    const { emailRef } = this;
    if (emailRef) {
      emailRef.focus();
    }
  };

  focusPasswordInput = () => {
    const { passwordRef } = this;
    if (passwordRef) {
      passwordRef.focus();
    }
  };

  focusMobileInput = () => {
    const { mobileRef } = this;
    if (mobileRef) {
      mobileRef.focus();
    }
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
      isModalVisible,
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.wrapper}>
        <StatusBar barStyle="light-content" />
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <View style={styles.logo}>
            <Image style={styles.logoImage} source={assets.logologin} />
            <Image source={assets.appName} />
          </View>
          <View style={styles.formContainer}>
            {isRegForm && (
              <Input
                value={name}
                fieldRef={ref => {
                  this.nameRef = ref;
                }}
                type={constants.inputTypes.name}
                onSubmitEditing={this.focusEmailInput}
                focusField={() => this.focusField(this.nameRef)}
                onChangeText={text => this.onChangeField('name', text)}
              />
            )}
            <Input
              value={email}
              fieldRef={ref => {
                this.emailRef = ref;
              }}
              keyboardType="email-address"
              type={constants.inputTypes.email}
              onSubmitEditing={this.focusPasswordInput}
              focusField={() => this.focusField(this.emailRef)}
              onChangeText={text => this.onChangeField('email', text)}
            />
            <Input
              value={password}
              fieldRef={ref => {
                this.passwordRef = ref;
              }}
              secureTextEntry
              onSubmitEditing={this.focusMobileInput}
              onPushButton={() => this.onPushEnterButton(email, password)}
              type={constants.inputTypes.password}
              keyboardType="numbers-and-punctuation"
              returnKeyType={!isRegForm ? 'go' : null}
              focusField={() => this.focusField(this.passwordRef)}
              onChangeText={text => this.onChangeField('password', text)}
            />
            {isRegForm && (
              <Input
                value={mobile}
                returnKeyType="go"
                onPushButton={() => this.onPushRegButton(name, email, password)}
                fieldRef={ref => {
                  this.mobileRef = ref;
                }}
                keyboardType="numbers-and-punctuation"
                type={constants.inputTypes.mobileNumber}
                focusField={() => this.focusField(this.mobileRef)}
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
        <PickPhotoModal
          isModalVisible={isModalVisible}
          toggleModalCallback={this.toggleModal}
          navigationCallback={this.handleOpenCamera}
          setPhotoUriCallback={this.setPhotoUriCallback}
        />
      </View>
    );
  }
}

export default Login;
