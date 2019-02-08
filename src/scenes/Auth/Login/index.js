// @flow

import React, { PureComponent } from 'react';

// $FlowFixMe
import { assoc, includes } from 'ramda';
import { compose, graphql } from 'react-apollo';
import {
  View,
  Text,
  Image,
  Keyboard,
  Animated,
  StatusBar,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

import Logo from '~/components/Logo';
import Input from '~/components/Input';
import Button from '~/components/Button';
import HeaderButton from '~/components/HeaderButton';
import ScrollViewContainer from '~/components/ScrollViewContainer';

import assets from '~/global/assets';
import Styles from '~/global/styles';
import colors from '~/global/colors';
import constants from '~/global/constants';
import * as SCENES_NAMES from '~/navigation/scenes';
import { isValid, normalize } from '~/global/utils';
import * as MUTATIONS from '~/graphql/auth/mutations';
import { isAndroid, isIphoneX } from '~/global/device';

import styles from './styles';
import type { Props, State } from './types';

const initialState = {
  name: '',
  email: '',
  mobile: '',
  warnings: {},
  password: '',
  isRegForm: false,
  isPasswordHidden: true,
  isKeyboardActive: false,
  marginBottom: new Animated.Value(normalize(100)),
  marginTop: new Animated.Value(normalize(0)),
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

  onTogglePasswordVisibility = () => {
    const { isPasswordHidden } = this.state;
    this.setState({
      isPasswordHidden: !isPasswordHidden,
    });
  };

  checkForErrors = () => {
    const { warnings } = this.state;
    return !!warnings.count;
  };

  checkFields = () => {
    const { name, email, password, mobile, isRegForm } = this.state;
    const warnings = {
      count: 0,
      name: '',
      email: '',
      mobile: '',
      password: '',
    };
    if (isRegForm && !name.trim()) {
      warnings.name = constants.warnings.emptyName;
      warnings.count += 1;
    }
    if (!email) {
      warnings.email = constants.warnings.emptyEmail;
      warnings.count += 1;
    }
    if (email && !isValid(email, constants.regExp.email)) {
      warnings.email = constants.warnings.invalidEmail;
      warnings.count += 1;
    }
    if (!password) {
      warnings.password = constants.warnings.emptyPassword;
      warnings.count += 1;
    }
    if (password && !isValid(password, constants.regExp.password)) {
      warnings.password = constants.warnings.invalidPassword;
      warnings.count += 1;
    }
    if (isRegForm && mobile && !isValid(mobile, constants.regExp.mobileNumber)) {
      warnings.mobile = constants.warnings.invalidMobile;
      warnings.count += 1;
    }
    this.setState({ warnings });
  };

  setWarnings = (email, password) => {
    this.setState({
      warnings: {
        count: 1,
        email: email || '',
        password: password || '',
      },
    });
  }

  onSubmitForm = async () => {
    const { signInMutation, signUpMutation, navigation } = this.props;
    const { email, password, isRegForm, name: fullName, mobile: phoneNumber } = this.state;

    /**
     * 'Promise.resolve' and 'await' below used because of async setState
     * in this.checkFields and this.checkForErrors
     */

    const isFormInvalid = await Promise.resolve()
      .then(() => this.checkFields())
      .then(() => this.checkForErrors());

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

        navigation.navigate(SCENES_NAMES.QuestionSceneName);
      } catch (error) {
        if (!isRegForm && includes(email, error.message)) {
          this.setWarnings(constants.warnings.unregisteredEmail, constants.warnings.userNotFound);
        }
        if (!isRegForm && error.message === constants.graphqlErrors.passwordIsIncorrect) {
          this.setWarnings(constants.warnings.userNotFound, constants.warnings.userNotFound);
        }
        if (isRegForm && error.message === constants.graphqlErrors.emailAlreadyExists) {
          this.setWarnings(constants.warnings.emailAlreadyExists);
        }
        if (error.message === constants.graphqlErrors.userNotFound) {
          this.setWarnings(constants.warnings.userNotFound, constants.warnings.userNotFound);
        }
      }
    }
  };

  focusField = (ref: Object) => {
    if (ref) {
      if (isAndroid) {
        this.keyboardAwareScrollView.scrollToFocusedInputWithNodeHandle(ref, normalize(100));
      }
      if (ref.input === undefined) {
        ref.focus();
      } else {
        ref.input.focus();
      }
    }
  }

  componentDidUpdate() {
    const { marginTop, marginBottom, isRegForm } = this.state;
    const listenerShow = 'keyboardWillShow';
    const listenerHide = 'keyboardWillHide';

    let marginTopValue;
    let marginBottomValue;

    if (isRegForm) {
      marginTopValue = isIphoneX ? 70 : 70;
      marginBottomValue = isIphoneX ? 50 : 0;
    } else {
      marginTopValue = isIphoneX ? 100 : 100;
      marginBottomValue = isIphoneX ? 80 : 30;
    }

    Keyboard.addListener(listenerShow, () => {
      this.setState({ isKeyboardActive: true });
      Animated.parallel([
        Animated.timing(marginBottom, {
          duration: 250,
          toValue: normalize(marginBottomValue),
        }),
        Animated.timing(marginTop, {
          duration: 250,
          toValue: normalize(marginTopValue),
        }),
      ]).start();
    });
    Keyboard.addListener(listenerHide, () => {
      this.setState({ isKeyboardActive: false });
      Animated.parallel([
        Animated.timing(marginBottom, {
          duration: 250,
          toValue: normalize(100),
        }),
        Animated.timing(marginTop, {
          duration: 250,
          toValue: normalize(0),
        }),
      ]).start();
    });
  }

  nameRef: any;

  emailRef: any;

  passwordRef: any;

  mobileRef: any;

  keyboardAwareScrollView: any;

  render() {
    const {
      props: {
        navigation,
      },
      state: {
        name,
        email,
        mobile,
        password,
        warnings,
        isRegForm,
        marginBottom,
        isPasswordHidden,
        isKeyboardActive,
        marginTop,
      },
    } = this;

    return (
      <ScrollViewContainer
        bgColor={colors.backGroundBlack}
        fieldRef={(ref) => {
          this.keyboardAwareScrollView = ref;
        }}
      >
        {isAndroid && <StatusBar backgroundColor={colors.backGroundBlack} barStyle="light-content" />}

        <Animated.View style={[
          styles.regForm,
          (isRegForm || warnings.length) && styles.form,
          isKeyboardActive && { marginBottom, marginTop },
        ]}
        >
          <Logo isSmall />
          {isRegForm && (
            <Input
              value={name}
              fieldRef={(ref) => {
                this.nameRef = ref;
              }}
              blurOnSubmit={false}
              customWarning={warnings.name}
              type={constants.inputTypes.name}
              placeholder={constants.placeholders.manufacture}
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
            customWarning={warnings.email}
            type={constants.inputTypes.email}
            placeholder={constants.placeholders.email}
            onChangeText={text => this.onChangeField('email', text)}
            onSubmitEditing={() => this.focusField(this.passwordRef)}
          />
          <Input
            value={password}
            fieldRef={(ref) => {
              this.passwordRef = ref;
            }}
            blurOnSubmit={false}
            onSubmitForm={this.onSubmitForm}
            customWarning={warnings.password}
            secureTextEntry={isPasswordHidden}
            type={constants.inputTypes.password}
            keyboardType="numbers-and-punctuation"
            placeholder={!isRegForm
              ? constants.placeholders.enterPassword
              : constants.placeholders.setPassword}
            returnKeyType={!isRegForm ? 'go' : undefined}
            onSubmitEditing={() => this.focusField(this.mobileRef)}
            onChangeText={text => this.onChangeField('password', text)}
          >
            <TouchableOpacity
              style={styles.toogleVisiblePasswordBtn}
              onPress={this.onTogglePasswordVisibility}
            >
              <Image
                resizeMode="contain"
                source={isPasswordHidden ? assets.hiddenPassword : assets.visiblePassword}
              />
            </TouchableOpacity>

          </Input>
          {isRegForm && (
            <Input
              value={mobile}
              returnKeyType="go"
              fieldRef={(ref) => {
                this.mobileRef = ref;
              }}
              blurOnSubmit={false}
              customWarning={warnings.mobile}
              onSubmitForm={this.onSubmitForm}
              mask={constants.masks.mobileNumber}
              keyboardType="numbers-and-punctuation"
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
          onPress={this.onSubmitForm}
          title={isRegForm ? constants.buttonTitles.reg : constants.buttonTitles.login}
        />
      </ScrollViewContainer>
    );
  }
}

export default compose(
  graphql(MUTATIONS.SIGN_IN_MUTATION, {
    name: 'signInMutation',
  }),
  graphql(MUTATIONS.SIGN_UP_MUTATION, {
    name: 'signUpMutation',
  }),
)(Login);
