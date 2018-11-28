// @flow

import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';

import Input from 'components/Input/index';
import Button from 'components/Button/index';

import colors from 'global/colors';
import images from 'global/images';
import constants from 'global/constants';
import styles from './styles';

type State = {
  isRegistrationForm: boolean,
  textInput: string | number,
};

type Props = {
  navigation: any,
};

class Login extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: { navigation: any }) => {
    const { state } = navigation;
    const isRegistrationForm = state.params && state.params.isRegistrationForm;
    return {
      headerStyle: {
        backgroundColor: colors.black,
      },
      headerLeft: (
        <TouchableWithoutFeedback
          onPress={() => state.params.onPushLeftHeaderButton()}
        >
          <View
            style={
              isRegistrationForm
                ? styles.inactiveHeaderButton
                : styles.activeHeaderButton
            }
          >
            <Text
              style={
                isRegistrationForm
                  ? styles.inactiveHeaderButtonText
                  : styles.activeHeaderButtonText
              }
            >
              Регистрация
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ),
      headerRight: (
        <TouchableWithoutFeedback
          onPress={() => state.params.onPushRightHeaderButton()}
        >
          <View
            style={
              isRegistrationForm
                ? styles.activeHeaderButton
                : styles.inactiveHeaderButton
            }
          >
            <Text
              style={
                isRegistrationForm
                  ? styles.activeHeaderButtonText
                  : styles.inactiveHeaderButtonText
              }
            >
              Вход
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ),
    };
  };

  constructor(props: Props) {
    super(props);
    const {
      props: { navigation },
    } = this;
    navigation.setParams({
      isRegistrationForm: false,
      onPushLeftHeaderButton: this.onPushLeftHeaderButton,
      onPushRightHeaderButton: this.onPushRightHeaderButton,
    });
  }

  state = {
    isRegistrationForm: false,
    textInput: '',
  };

  onHandleChangeText = (value: string | number) => {
    this.setState({
      textInput: value,
    });
  };

  onPushLeftHeaderButton = () => {
    const {
      props: { navigation },
    } = this;
    navigation.setParams({ isRegistrationForm: true });
    this.setState({
      isRegistrationForm: true,
    });
  };

  onPushRightHeaderButton = () => {
    const {
      props: { navigation },
    } = this;
    navigation.setParams({ isRegistrationForm: false });
    this.setState({
      isRegistrationForm: false,
    });
  };

  render() {
    const {
      state: { textInput, isRegistrationForm },
    } = this;

    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image style={{ marginBottom: 25 }} source={images.logo} />
          <Image source={images.appName} />
        </View>
        <View
          style={{
            flex: 2,
            width: '100%',
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
          }}
        >
          {isRegistrationForm && (
            <Input
              type={constants.inputTypes.name}
              value={textInput}
              onChangeText={() => this.onHandleChangeText}
            />
          )}
          <Input
            type={constants.inputTypes.email}
            value={textInput}
            onChangeText={() => this.onHandleChangeText}
          />
          <Input
            type={constants.inputTypes.password}
            value={textInput}
            onChangeText={() => this.onHandleChangeText}
          />
          {isRegistrationForm && (
            <Input
              type={constants.inputTypes.mobileNumber}
              value={textInput}
              onChangeText={() => this.onHandleChangeText}
            />
          )}
          {!isRegistrationForm && (
            <View
              style={{
                flex: 1,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TouchableWithoutFeedback>
                <View>
                  <Text
                    style={{
                      color: colors.buttonBlue,
                      fontSize: 16,
                      lineHeight: 19,
                    }}
                  >
                    Забыли пароль?
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View>
                  <Text
                    style={{
                      color: colors.buttonBlue,
                      fontSize: 16,
                      lineHeight: 19,
                    }}
                  >
                    Регистрация
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>
        <Button
          title={
            isRegistrationForm
              ? constants.buttonTitles.reg
              : constants.buttonTitles.login
          }
        />
      </View>
    );
  }
}

export default Login;
