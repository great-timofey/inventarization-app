// @flow

import React, { PureComponent } from 'react';
import { Alert, View, Text, Keyboard, AsyncStorage } from 'react-native';
import { compose, graphql } from 'react-apollo';

import Logo from 'components/Logo';
import Input from 'components/Input';
import Button from 'components/Button';
import Warning from 'components/Warning';
import HeaderButton from 'components/HeaderButton';
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
  warnings: [],
  isRegForm: false,
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

  onChangeField = (field: string, value: string) => {
    this.setState({
      warnings: [],
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
    const { warnings } = this.state;
    if (warnings.length) return true;
    return false;
  };

  checkForWarnings = () => {
    const { warnings } = this.state;
    if (warnings.length) {
      return constants.errors.login[warnings[0]];
    }
    return '';
  };

  checkValue = () => {
    const { name, email, password, mobile, isRegForm } = this.state;
    const warnings = [];
    if (isRegForm && utils.isEmpty(name)) {
      warnings.push('name');
    }
    if (!utils.isValid(email, constants.regExp.email)) {
      warnings.push('email');
    }
    if (!utils.isValid(password, constants.regExp.password)) {
      warnings.push('password');
    }
    if (
      isRegForm &&
      mobile &&
      !utils.isValid(mobile, constants.regExp.mobileNumber)
    ) {
      warnings.push('mobile');
    }
    this.setState({ warnings });
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

    /** 'Promise.resolve' and 'await' below used because of async setState in this.checkValue and this.checkForErrors */

    const isFormInvalid = await Promise.resolve()
      .then(_ => this.checkValue())
      .then(_ => this.checkForErrors());

    if (!isFormInvalid) {
      try {
        const variables = { email, password, fullName };
        if (phoneNumber) variables.phoneNumber = phoneNumber;

        const { data } = await (isRegForm
          ? signUpMutation({ variables })
          : signInMutation({ variables }));

        console.log(data);

        await AsyncStorage.setItem(
          'token',
          isRegForm ? data.signUpUser.token : data.signInUser.token
        );
        // await setAuthMutationClient({ variables: { isAuthed: true } });
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
    const { name, email, mobile, password, warnings, isRegForm } = this.state;
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
              blurOnSubmit={false}
              isWarning={warnings.includes('name')}
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
            blurOnSubmit={false}
            isWarning={warnings.includes('email')}
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
            blurOnSubmit={false}
            isWarning={warnings.includes('password')}
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
              blurOnSubmit={false}
              isWarning={warnings.includes('mobile')}
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
          isDisable={false}
          onPress={() => this.props.navigation.navigate('QRScan')}
        />
        <Warning
          isVisible={this.checkForErrors()}
          title={this.checkForWarnings()}
        />
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
