// @flow

import React, { PureComponent } from 'react';
import { Alert, View, Text, Keyboard, AsyncStorage } from 'react-native';

import { compose, graphql } from 'react-apollo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Logo from 'components/Logo';
import Input from 'components/Input';
import Button from 'components/Button';
import Warning from 'components/Warning';
import HeaderButton from 'components/HeaderButton';
import PickPhotoModal from 'components/PickPhotoModal';

import utils from 'global/utils';
import Styles from 'global/styles';
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
      headerStyle: Styles.authHeaderStyle,
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
        console.log('logged in with data: ', result);
        await AsyncStorage.setItem('token', result.data.signInUser.token);
      })
      .then(_ => {
        client.mutate({
          mutation: MUTATIONS.SET_AUTH_MUTATION_CLIENT,
          variables: { isAuthed: true },
        });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  handleSignUp = () => {
    const { client } = this.props;
    const { email, password, name, mobile } = this.state;

    const variables = { email, password, fullName: name };
    if (mobile) variables.mobile = mobile;

    client
      .mutate({
        mutation: MUTATIONS.SIGN_UP_MUTATION,
        variables,
      })
      .then(async result => {
        console.log('signed up with data: ', result);
        await AsyncStorage.setItem('token', result.data.signUpUser.token);
      })
      .then(_ => {
        client.mutate({
          mutation: MUTATIONS.SET_AUTH_MUTATION_CLIENT,
          variables: { isAuthed: true },
        });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
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

  onPressButton = (isRegForm: boolean) => {
    const { navigation } = this.props;
    navigation.setParams({ isRegForm: !isRegForm });
    this.setState({
      ...initialState,
      isRegForm: !isRegForm,
    });
    Keyboard.dismiss();
  };

  onSubmitForm = async () => {
    const {
      email,
      password,
      name: fullName,
      mobile: phoneNumber,
      isRegForm,
    } = this.state;

    const {
      signInMutation,
      signUpMutation,
      setAuthMutationClient,
    } = this.props;

    if (utils.isValidLoginForm(email, password, fullName, isRegForm)) {
      try {
        const variables = { email, password, fullName };
        if (phoneNumber) variables.phoneNumber = phoneNumber;

        const { data } = await (isRegForm
          ? signUpMutation({ variables })
          : signInMutation({ variables }));

        await AsyncStorage.setItem(
          'token',
          isRegForm ? data.signUpUser.token : data.signInUser.token
        );
        await setAuthMutationClient({ variables: { isAuthed: true } });
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  };

  focusField = (ref: Object) => {
    if (ref.input === undefined) {
      ref.focus();
    } else {
      ref.input.focus();
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
        <Warning
          isVisible={
            utils.isWarning(email, constants.inputTypes.email) ||
            utils.isWarning(password, constants.inputTypes.password)
          }
          isEmail={utils.isWarning(email, constants.inputTypes.email)}
        />
      </View>
    );
  }
}

export default compose(
  graphql(MUTATIONS.SET_AUTH_MUTATION_CLIENT, {
    name: 'setAuthMutationClient',
  }),
  graphql(MUTATIONS.SIGN_IN_MUTATION, {
    name: 'signInMutation',
  }),
  graphql(MUTATIONS.SIGN_UP_MUTATION, {
    name: 'signUpMutation',
  })
)(Login);
