// @flow

import React, { PureComponent } from 'react';
import { Alert, View, Text, Keyboard, AsyncStorage } from 'react-native';
import { compose, graphql } from 'react-apollo';

import Logo from 'components/Logo';
import Input from 'components/Input';
import Button from 'components/Button';
import Warning from 'components/Warning';
import HeaderButton from 'components/HeaderButton';
import PickPhotoModal from 'components/PickPhotoModal';
import ScrollViewContainer from 'components/KeyboardAwareScrollView';

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
  warnings: {
    name: false,
    email: false,
    mobile: false,
    password: false,
  },
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
        onPress: () => state.params.onToggleForm(isRegForm),
      }),
      headerRight: HeaderButton({
        name: 'Вход',
        isActive: isRegForm,
        onPress: () => state.params.onToggleForm(isRegForm),
      }),
    };
  };

  constructor(props: Props) {
    super(props);
    const { navigation } = this.props;

    navigation.setParams({
      isRegForm: false,
      onToggleForm: this.onToggleForm,
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
      warnings: {
        ...initialState.warnings,
      },
      [field]: value,
    });
  };

  onToggleForm = (isRegForm: boolean) => {
    const { navigation } = this.props;
    navigation.setParams({ isRegForm: !isRegForm });
    this.setState({
      ...initialState,
      isRegForm: !isRegForm,
    });
    Keyboard.dismiss();
  };

  checkForErrors = () => {
    const {
      warnings: { email, password, name, mobile },
      isRegForm,
    } = this.state;

    if (isRegForm) {
      if (email || password || name || mobile) return true;
    } else if (email || password) return true;
    return false;
  };

  checkValue = () => {
    const { name, email, password, mobile, isRegForm } = this.state;
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(mobile);
    if (isRegForm) {
      this.setState({
        warnings: {
          name: utils.isEmpty(name),
          email: !utils.isValid(email, constants.regExp.email),
          password: !utils.isValid(password, constants.regExp.password),
          mobile: !utils.isValid(mobile, constants.regExp.mobileNumber),
        },
      });
    } else {
      this.setState({
        warnings: {
          email: !utils.isValid(email, constants.regExp.email),
          password: !utils.isValid(password, constants.regExp.password),
        },
      });
    }
  };

  onSubmitForm = async () => {
    const {
      isRegForm,
      email,
      password,
      name: fullName,
      mobile: phoneNumber,
    } = this.state;
    const {
      signInMutation,
      signUpMutation,
      setAuthMutationClient,
    } = this.props;

    // console.log(this.state);

    this.checkValue();
    console.log(this.checkForErrors());
    // if (!this.checkForErrors()) {
    //   try {
    //     const variables = { email, password, fullName };
    //     if (phoneNumber) variables.phoneNumber = phoneNumber;

    //     const { data } = await (isRegForm
    //       ? signUpMutation({ variables })
    //       : signInMutation({ variables }));

    //     console.log(data);

    //     await AsyncStorage.setItem(
    //       'token',
    //       isRegForm ? data.signUpUser.token : data.signInUser.token
    //     );
    //     // await setAuthMutationClient({ variables: { isAuthed: true } });
    //   } catch (error) {
    //     Alert.alert(error.message);
    //   }
    // }
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
      warnings,
      isRegForm,
      isModalVisible,
    } = this.state;
    const { navigation } = this.props;

    return (
      <ScrollViewContainer>
        <Logo isSmall />
        <View style={styles.formContainer}>
          {isRegForm && (
            <Input
              value={name}
              fieldRef={ref => {
                this.nameRef = ref;
              }}
              isWarning={warnings.name}
              type={constants.inputTypes.name}
              onSubmitEditing={() => this.focusField(this.emailRef)}
              onChangeText={text => this.onChangeField('name', text)}
            />
          )}
          <Input
            value={email}
            fieldRef={ref => {
              this.emailRef = ref;
            }}
            isWarning={warnings.email}
            keyboardType="email-address"
            type={constants.inputTypes.email}
            onChangeText={text => this.onChangeField('email', text)}
            onSubmitEditing={() => this.focusField(this.passwordRef)}
          />
          <Input
            secureTextEntry
            value={password}
            fieldRef={ref => {
              this.passwordRef = ref;
            }}
            isWarning={warnings.password}
            onSubmitForm={this.onSubmitForm}
            type={constants.inputTypes.password}
            keyboardType="numbers-and-punctuation"
            returnKeyType={!isRegForm ? 'go' : undefined}
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
              isWarning={warnings.mobile}
              onSubmitForm={this.onSubmitForm}
              mask={constants.masks.mobileNumber}
              keyboardType="numbers-and-punctuation"
              type={constants.inputTypes.mobileNumber}
              placeholder={constants.placeHolders.mobileNumber}
              onChangeText={text => this.onChangeField('mobile', text)}
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
                onPress={() => navigation.state.params.onPressButton(isRegForm)}
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
          isDisable={this.checkForErrors()}
          onPress={this.checkValue}
        />
        <PickPhotoModal
          isModalVisible={isModalVisible}
          toggleModalCallback={this.toggleModal}
          navigationCallback={this.handleOpenCamera}
          setPhotoUriCallback={this.setPhotoUriCallback}
        />
        <Warning isVisible={this.checkForErrors()} isEmail={warnings.email} />
      </ScrollViewContainer>
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
