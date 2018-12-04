// @flow

import React, { PureComponent } from 'react';
import { View, Text, Image, Keyboard } from 'react-native';
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

  isValidForm = (
    email: string,
    password: string,
    name: string,
    isRegForm: boolean
  ) => {
    const isEmailValid =
      email && utils.isValidate(email, constants.inputTypes.email);
    const isPasswordValid =
      password && utils.isValidate(password, constants.inputTypes.password);
    if (isRegForm && name && isEmailValid && isPasswordValid) {
      return true;
    }
    if (!isRegForm && isEmailValid && isPasswordValid) {
      return true;
    }
    return false;
  };

  onSubmitForm = (
    email: string,
    password: string,
    name: string,
    isRegForm: boolean
  ) => {
    if (this.isValidForm(email, password, name, isRegForm)) {
      alert('SUCCESS');
      return null;
    }
    return null;
  };

  focusField = (ref: Object) => {
    if (ref) ref.focus();
  };

  isEmailEmpty = (value: string) => value === '';

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
                focusField={() => this.focusField(this.nameRef)}
                onSubmitEditing={() => this.focusField(this.emailRef)}
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
              focusField={() => this.focusField(this.emailRef)}
              onChangeText={text => this.onChangeField('email', text)}
              onSubmitEditing={() => this.focusField(this.passwordRef)}
            />
            <Input
              secureTextEntry
              value={password}
              fieldRef={ref => {
                this.passwordRef = ref;
              }}
              type={constants.inputTypes.password}
              keyboardType="numbers-and-punctuation"
              returnKeyType={!isRegForm ? 'go' : null}
              focusField={() => this.focusField(this.passwordRef)}
              onSubmitEditing={() => this.focusField(this.mobileRef)}
              onSubmitForm={() =>
                this.onSubmitForm(email, password, name, isRegForm)
              }
              onChangeText={text => this.onChangeField('password', text)}
            />
            {isRegForm && (
              <Input
                value={mobile}
                returnKeyType="go"
                fieldRef={ref => {
                  this.mobileRef = ref;
                }}
                keyboardType="numbers-and-punctuation"
                type={constants.inputTypes.mobileNumber}
                focusField={() => this.focusField(this.mobileRef)}
                onChangeText={text => this.onChangeField('mobile', text)}
                onSubmitForm={() =>
                  this.onSubmitForm(email, password, name, isRegForm)
                }
              />
            )}
            {!isRegForm && (
              <View style={styles.additionalButtons}>
                <AdditionalButton
                  title={constants.buttonTitles.forgotPassword}
                  onPress={() =>
                    navigation.navigate(SCENE_NAMES.ForgotPasswordSceneName)
                  }
                />
                <AdditionalButton
                  title={constants.buttonTitles.registration}
                  onPress={() =>
                    navigation.state.params.onPushHeaderButton(isRegForm)
                  }
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
            isDisable={!this.isValidForm(email, password, name, isRegForm)}
            onPress={() => this.onSubmitForm(email, password, name, isRegForm)}
          />
        </KeyboardAwareScrollView>
        <PickPhotoModal
          isModalVisible={isModalVisible}
          toggleModalCallback={this.toggleModal}
          navigationCallback={this.handleOpenCamera}
          setPhotoUriCallback={this.setPhotoUriCallback}
        />
        {!this.isEmailEmpty(email) &&
          !utils.isValidate(email, constants.inputTypes.email) && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                backgroundColor: colors.black,
                height: 56,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{ color: colors.invalidBorder, textAlign: 'center' }}
              >
                {constants.errors.login.email}
              </Text>
            </View>
          )}
      </View>
    );
  }
}

export default Login;
