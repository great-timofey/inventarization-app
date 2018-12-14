// @flow

import React, { PureComponent } from 'react';
import { Alert, View, Text, Keyboard, AsyncStorage } from 'react-native';

import R from 'ramda';
import { compose, graphql } from 'react-apollo';
import {
  Alert,
  View,
  Text,
  Keyboard,
  Animated,
  AsyncStorage,
} from 'react-native';

import Logo from 'components/Logo';
import Input from 'components/Input';
import Button from 'components/Button';
import HeaderButton from 'components/HeaderButton';
import ScrollViewContainer from 'components/KeyboardAwareScrollView';

import Styles from 'global/styles';
import constants from 'global/constants';
import { isValid } from 'global/utils';
import * as SCENE_NAMES from 'navigation/scenes';
import * as MUTATIONS from 'graphql/auth/mutations';
import utils, { normalize, isSmallDevice } from 'global/utils';

import styles from './styles';
import type { Props, State } from './types';

const initialState = {
  name: '',
  email: '',
  mobile: '',
  warnings: [],
  password: '',
  isRegForm: false,
  isKeyboardActive: false,
  keyboardPadding: new Animated.Value(0),
  paddingContainer: new Animated.Value(normalize(30)),
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

  componentDidMount() {
    const { keyboardPadding, paddingContainer } = this.state;
    const listenerShow = 'keyboardWillShow';
    const listenerHide = 'keyboardWillHide';
    Keyboard.addListener(listenerShow, event => {
      Animated.parallel([
        Animated.timing(keyboardPadding, {
          duration: 250,
          toValue: -event.endCoordinates.height,
        }),
        Animated.timing(paddingContainer, {
          duration: 250,
          toValue: isSmallDevice() ? normalize(57) : normalize(30),
        }),
      ]).start();
    });
    Keyboard.addListener(listenerHide, () => {
      Animated.parallel([
        Animated.timing(keyboardPadding, {
          duration: 250,
          toValue: 0,
        }),
        Animated.timing(paddingContainer, {
          duration: 250,
          toValue: normalize(30),
        }),
      ]).start();
    });
  }

  onChangeField = (field: string, value: string) => {
    this.setState({
      [field]: value,
    });
  };

  onToggleForm = (isRegForm: boolean) => {
    Keyboard.dismiss();
    const { navigation } = this.props;
    navigation.setParams({ isRegForm: !isRegForm });
    this.setState(state =>
      R.assoc('isRegForm', !state.isRegForm, initialState)
    );
  };

  checkForErrors = () => {
    const { warnings } = this.state;
    if (warnings.length) return true;
    return false;
  };

  checkValue = () => {
    const { name, email, password, mobile, isRegForm } = this.state;
    const warnings = [];
    if (isRegForm && !name.trim()) {
      warnings.push('name');
    }
    if (!isValid(email, constants.regExp.email)) {
      warnings.push('email');
    }
    if (!isValid(password, constants.regExp.password)) {
      warnings.push('password');
    }
    if (
      isRegForm &&
      mobile &&
      !isValid(mobile, constants.regExp.mobileNumber)
    ) {
      warnings.push('mobile');
    }
    this.setState({ warnings });
  };

  onSubmitForm = async () => {
    const {
      email,
      password,
      isRegForm,
      name: fullName,
      mobile: phoneNumber,
    } = this.state;
    const {
      navigation,
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
        const variables = {
          email,
          password,
          fullName,
        };
        if (phoneNumber) variables.phoneNumber = phoneNumber;

        const { data } = await (isRegForm
          ? signUpMutation({ variables })
          : signInMutation({ variables }));

        await AsyncStorage.setItem(
          'token',
          isRegForm ? data.signUpUser.token : data.signInUser.token
        );

        navigation.navigate('CreateCompany');
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
    const { navigation } = this.props;
    const {
      name,
      email,
      mobile,
      password,
      warnings,
      isRegForm,
      keyboardPadding,
      paddingContainer,
    } = this.state;

    return (
      <ScrollViewContainer>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  translateY: keyboardPadding,
                },
              ],
            },
            { paddingVertical: paddingContainer },
          ]}
        >
          <Animated.View
            style={[
              styles.regForm,
              (isRegForm || warnings.length) && styles.form,
            ]}
          >
            <Logo isSmall />
            {isRegForm && (
              <Input
                value={name}
                fieldRef={ref => {
                  this.nameRef = ref;
                }}
                blurOnSubmit={false}
                type={constants.inputTypes.name}
                isWarning={warnings.includes('name')}
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
              keyboardType="email-address"
              type={constants.inputTypes.email}
              isWarning={warnings.includes('email')}
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
              onSubmitForm={this.onSubmitForm}
              type={constants.inputTypes.password}
              keyboardType="numbers-and-punctuation"
              isWarning={warnings.includes('password')}
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
                onSubmitForm={this.onSubmitForm}
                mask={constants.masks.mobileNumber}
                keyboardType="numbers-and-punctuation"
                isWarning={warnings.includes('mobile')}
                type={constants.inputTypes.mobileNumber}
                placeholder={constants.placeHolders.mobileNumber}
                onChangeText={text => this.onChangeField('mobile', text)}
              />
            )}
            {!isRegForm && (
              <View style={styles.additionalButtons}>
                <AdditionalButton
                  title={constants.buttonTitles.forgotPassword}
                  onPress={() => {}}
                />
                <AdditionalButton
                  title={constants.buttonTitles.registration}
                  onPress={() =>
                    navigation.state.params.onToggleForm(isRegForm)
                  }
                />
              </View>
            )}
          </Animated.View>
          <Button
            title={
              isRegForm
                ? constants.buttonTitles.reg
                : constants.buttonTitles.login
            }
            onPress={this.onSubmitForm}
          />
        </Animated.View>
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
