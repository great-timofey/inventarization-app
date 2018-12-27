// @flow

import React, { PureComponent } from 'react';

import { includes, assoc } from 'ramda';
import { compose, graphql, withApollo } from 'react-apollo';
import { Alert, View, Text, Keyboard, Animated, AsyncStorage } from 'react-native';

import Logo from '~/components/Logo';
import Input from '~/components/Input';
import Button from '~/components/Button';
import HeaderButton from '~/components/HeaderButton';
import ScrollViewContainer from '~/components/ScrollViewContainer';

import { isValid } from '~/global/utils';
import Styles from '~/global/styles';
import colors from '~/global/colors';
import constants from '~/global/constants';
import * as QUERIES from '~/graphql/auth/queries';
import * as MUTATIONS from '~/graphql/auth/mutations';

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
};

const AdditionalButton = ({ title, onPress }: { title: string, onPress: Function }) => (
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
      [field]: value,
    });
  };

  onToggleForm = (isRegForm: boolean) => {
    Keyboard.dismiss();
    const { navigation } = this.props;
    navigation.setParams({ isRegForm: !isRegForm });
    this.setState(state => assoc('isRegForm', !state.isRegForm, initialState));
  };

  checkForErrors = () => !!this.state.warnings.length;

  checkFields = () => {
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
    if (isRegForm && mobile && !isValid(mobile, constants.regExp.mobileNumber)) {
      warnings.push('mobile');
    }
    this.setState({ warnings });
  };

  onSubmitForm = async () => {
    const { email, password, isRegForm, name: fullName, mobile: phoneNumber } = this.state;
    const { client, signInMutation, signUpMutation } = this.props;

    /**
     * 'Promise.resolve' and 'await' below used because of async setState
     * in this.checkFields and this.checkForErrors
     */

    const isFormInvalid = await Promise.resolve()
      .then(_ => this.checkFields())
      .then(_ => this.checkForErrors());

    if (!isFormInvalid) {
      try {
        const variables: {|
          email: string,
          password: string,
          fullName: string,
          phoneNumber?: string,
        |} = {
          email,
          password,
          fullName,
        };
        if (phoneNumber) {
          variables.phoneNumber = phoneNumber;
        }

        const { data } = await (isRegForm
          ? signUpMutation({ variables })
          : signInMutation({ variables }));

        await AsyncStorage.setItem(
          'token',
          isRegForm ? data.signUpUser.token : data.signInUser.token,
        );

        const { data: currentUserData } = await client.query({
          query: QUERIES.GET_CURRENT_USER_COMPANIES,
        });
        this.setupUser(currentUserData);
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  };

  setupUser = async (userData: Object) => {
    const { setAuthMutationClient, setUserIdMutationClient, setUserCompanyMutationClient } = this.props;

    const {
      current: {
        id,
        userCompanies: [firstCompany],
      },
    } = userData;

    await setUserIdMutationClient({ variables: { id } });
    await setUserCompanyMutationClient({ variables: { userCompany: firstCompany } });
    await setAuthMutationClient({ variables: { isAuthed: true } });
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
    const { name, email, mobile, password, warnings, isRegForm } = this.state;

    return (
      <ScrollViewContainer bgColor={colors.backGroundBlack}>
        <Animated.View style={[styles.regForm, (isRegForm || warnings.length) && styles.form]}>
          <Logo isSmall />
          {isRegForm && (
            <Input
              value={name}
              fieldRef={(ref) => {
                this.nameRef = ref;
              }}
              blurOnSubmit={false}
              type={constants.inputTypes.name}
              isWarning={includes('name', warnings)}
              onSubmitEditing={() => this.focusField(this.emailRef)}
              onChangeText={text => this.onChangeField('name', text)}
            />
          )}
          <Input
            value={email}
            fieldRef={(ref) => {
              this.emailRef = ref;
            }}
            blurOnSubmit={false}
            keyboardType="email-address"
            type={constants.inputTypes.email}
            isWarning={includes('email', warnings)}
            onChangeText={text => this.onChangeField('email', text)}
            onSubmitEditing={() => this.focusField(this.passwordRef)}
          />
          <Input
            secureTextEntry
            value={password}
            fieldRef={(ref) => {
              this.passwordRef = ref;
            }}
            blurOnSubmit={false}
            onSubmitForm={this.onSubmitForm}
            type={constants.inputTypes.password}
            keyboardType="numbers-and-punctuation"
            isWarning={includes('password', warnings)}
            returnKeyType={!isRegForm ? 'go' : undefined}
            onSubmitEditing={() => this.focusField(this.mobileRef)}
            onChangeText={text => this.onChangeField('password', text)}
          />
          {isRegForm && (
            <Input
              value={mobile}
              returnKeyType="go"
              fieldRef={(ref) => {
                this.mobileRef = ref;
              }}
              blurOnSubmit={false}
              onSubmitForm={this.onSubmitForm}
              mask={constants.masks.mobileNumber}
              keyboardType="numbers-and-punctuation"
              isWarning={includes('mobile', warnings)}
              type={constants.inputTypes.mobileNumber}
              placeholder={constants.placeholders.mobileNumber}
              onChangeText={text => this.onChangeField('mobile', text)}
            />
          )}
          {!isRegForm && (
            <View style={styles.additionalButtons}>
              <AdditionalButton title={constants.buttonTitles.forgotPassword} onPress={() => {}} />
              <AdditionalButton
                title={constants.buttonTitles.registration}
                onPress={() => navigation.state.params.onToggleForm(isRegForm)}
              />
            </View>
          )}
        </Animated.View>
        <Button
          title={isRegForm ? constants.buttonTitles.reg : constants.buttonTitles.login}
          onPress={this.onSubmitForm}
        />
      </ScrollViewContainer>
    );
  }
}

export default compose(
  withApollo,
  graphql(MUTATIONS.SET_AUTH_MUTATION_CLIENT, {
    name: 'setAuthMutationClient',
  }),
  graphql(MUTATIONS.SET_USER_COMPANY_MUTATION_CLIENT, {
    name: 'setUserCompanyMutationClient',
  }),
  graphql(MUTATIONS.SET_USER_ID_MUTATION_CLIENT, {
    name: 'setUserIdMutationClient',
  }),
  graphql(MUTATIONS.SIGN_IN_MUTATION, {
    name: 'signInMutation',
  }),
  graphql(MUTATIONS.SIGN_UP_MUTATION, {
    name: 'signUpMutation',
  }),
)(Login);
