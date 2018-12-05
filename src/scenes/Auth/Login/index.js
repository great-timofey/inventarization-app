// @flow

import React, { PureComponent } from 'react';
import { View, Text, Keyboard, AsyncStorage } from 'react-native';

import { withApollo } from 'react-apollo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Logo from 'components/Logo';
import Input from 'components/Input';
import Button from 'components/Button';
import EmailError from 'components/EmailError';
import HeaderButton from 'components/HeaderButton';
import PickPhotoModal from 'components/PickPhotoModal';

import utils from 'global/utils';
import colors from 'global/colors';
import constants from 'global/constants';
import * as SCENE_NAMES from 'navigation/scenes';
import * as MUTATIONS from 'graphql/auth/mutations';
import styles from './styles';
import type { Props, State } from './types';

const initialState = {
  name: '',
  email: '',
  mobile: '',
  password: '',
  loading: false,
  isRegForm: false,
  isModalVisible: false,
  isKeyboardActive: false,
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
  static navigationOptions = ({ navigation }: { navigation: Object }) => {
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
        onPress: () => state.params.onPressButton(isRegForm),
      }),
      headerRight: HeaderButton({
        name: 'Вход',
        isActive: isRegForm,
        onPress: () => state.params.onPressButton(isRegForm),
      }),
    };
  };

  constructor(props: Props) {
    super(props);
    const { navigation } = this.props;

    navigation.setParams({
      isRegForm: false,
      onPressButton: this.onPressButton,
    });
    this.state = { ...initialState };
  }

  toggleModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };

  handleSignIn = () => {
    const { client } = this.props;
    const { email, password } = this.state;

    client
      .mutate({
        mutation: MUTATIONS.SIGN_IN_MUTATION,
        variables: { email, password },
      })
      .then(async result => {
        console.log(result);
        await AsyncStorage.setItem('token', result.data.signInUser.token);
      })
      .then(_ => {
        client.mutate({
          mutation: MUTATIONS.SIGN_IN_MUTATION_CLIENT,
          variables: { isAuthed: true },
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSignUp = () => {};

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

  onPressButton = (isRegForm: boolean) => {
    const { navigation } = this.props;
    navigation.setParams({ isRegForm: !isRegForm });
    this.setState({
      ...initialState,
      isRegForm: !isRegForm,
    });
    Keyboard.dismiss();
  };

  onSubmitForm = () => {
    const { email, password, name, isRegForm } = this.state;
    if (utils.isValidLoginForm(email, password, name, isRegForm)) {
      this.handleSignIn();
    }
  };

  focusField = (ref: Object) => {
    if (ref.input === undefined) {
      ref.focus();
    } else {
      ref.input.focus();
    }
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
          <Logo isSmall />
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
              onSubmitForm={this.onSubmitForm}
              type={constants.inputTypes.password}
              keyboardType="numbers-and-punctuation"
              returnKeyType={!isRegForm ? 'go' : undefined}
              focusField={() => this.focusField(this.passwordRef)}
              onSubmitEditing={() => this.focusField(this.mobileRef)}
              onChangeText={text => this.onChangeField('password', text)}
            />
            {isRegForm && (
              <Input
                value={mobile}
                returnKeyType="go"
                fieldRef={ref => {
                  this.mobileRef = ref;
                }}
                onSubmitForm={this.onSubmitForm}
                keyboardType="numbers-and-punctuation"
                type={constants.inputTypes.mobileNumber}
                placeholder={constants.placeHolders.mobileNumber}
                focusField={() => this.focusField(this.mobileRef)}
                onChangeText={text => this.onChangeField('mobile', text)}
                mask={constants.masks.mobileNumber}
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
                    navigation.state.params.onPressButton(isRegForm)
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
            isDisable={
              !utils.isValidLoginForm(email, password, name, isRegForm)
            }
            onPress={this.onSubmitForm}
          />
        </KeyboardAwareScrollView>
        <PickPhotoModal
          isModalVisible={isModalVisible}
          toggleModalCallback={this.toggleModal}
          navigationCallback={this.handleOpenCamera}
          setPhotoUriCallback={this.setPhotoUriCallback}
        />
        {!this.isEmailEmpty(email) &&
          !utils.isValid(email, constants.inputTypes.email) && <EmailError />}
      </View>
    );
  }
}

export default withApollo(Login);
