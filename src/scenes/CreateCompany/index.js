// @flow

import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Keyboard,
  Animated,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import dayjs from 'dayjs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { graphql, compose } from 'react-apollo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// $FlowFixMe
import { or, isEmpty, concat, assoc, remove, trim, includes } from 'ramda';

import Input from '~/components/Input';
import Button from '~/components/Button';
import AddButton from '~/components/AddButton';
import HeaderTitle from '~/components/HeaderTitle';
import PickPhotoModal from '~/components/PickPhotoModal';
import HeaderBackButton from '~/components/HeaderBackButton';

import colors from '~/global/colors';
import constants from '~/global/constants';
import globalStyles from '~/global/styles';
import * as SCENE_NAMES from '~/navigation/scenes';
import * as MUTATIONS from '~/graphql/auth/mutations';
import { isIphoneX, isAndroid, isIOS } from '~/global/device';
import { convertToApolloUpload, normalize, isValid } from '~/global/utils';

import styles from './styles';
import type { Props, State, InviteeProps } from './types';

const RemoveInviteeButton = props => (
  <MaterialIcon.Button
    {...props}
    name="cancel"
    activeOpacity={0.5}
    color={colors.white}
    size={normalize(34)}
    style={styles.inviteeRemove}
    iconStyle={{ marginRight: 0 }}
    underlayColor={colors.transparent}
    backgroundColor={colors.transparent}
  />
);
class CreateCompany extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: [globalStyles.authHeaderStyleBig, { backgroundColor: colors.white }],
    headerTitle: HeaderTitle({
      color: colors.header.createCompany,
      title: constants.headers.createNewCompany,
    }),
    headerTitleStyle: globalStyles.headerTitleStyle,
    headerLeft: HeaderBackButton({
      onPress: () => navigation.goBack(),
    }),
    headerRight: <View />,
  });

  state = {
    invitees: [],
    warnings: [],
    companyName: '',
    chosenPhotoUri: '',
    currentInvitee: '',
    isModalVisible: false,
    keyboardPadding: new Animated.Value(0),
    paddingTop: new Animated.Value(normalize(20)),
    marginBottom: new Animated.Value(isIphoneX ? normalize(200) : normalize(75)),
  };

  navListener: any;

  componentDidMount() {
    const { navigation } = this.props;
    const { keyboardPadding, marginBottom, paddingTop } = this.state;
    const listenerShow = 'keyboardWillShow';
    const listenerHide = 'keyboardWillHide';

    this.navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    Keyboard.addListener(listenerShow, (event) => {
      Animated.parallel([
        Animated.timing(keyboardPadding, {
          duration: 250,
          toValue: -event.endCoordinates.height,
        }),
        Animated.timing(marginBottom, {
          duration: 250,
          toValue: isIphoneX ? normalize(50) : normalize(15),
        }),
        Animated.timing(paddingTop, {
          duration: 250,
          toValue: normalize(event.endCoordinates.height - 110),
        }),
      ]).start();
    });
    Keyboard.addListener(listenerHide, () => {
      Animated.parallel([
        Animated.timing(keyboardPadding, {
          duration: 250,
          toValue: 0,
        }),
        Animated.timing(marginBottom, {
          duration: 250,
          toValue: isIphoneX ? normalize(200) : normalize(75),
        }),
        Animated.timing(paddingTop, {
          duration: 250,
          toValue: normalize(20),
        }),
      ]).start();
    });
  }

  handleOpenCamera = () => {
    const { navigation } = this.props;
    this.toggleModal();
    navigation.navigate(SCENE_NAMES.CameraSceneName, {
      setPhotoUriCameraCallback: this.setPhotoUriCameraCallback,
    });
  };

  handleAddInvitee = () => {
    const { invitees, currentInvitee } = this.state;
    if (isValid(currentInvitee, constants.regExp.email)) {
      this.setState({
        currentInvitee: '',
        invitees: concat(invitees, [currentInvitee]),
      });
    } else {
      // $FlowFixMe
      this.setState(state => assoc(['warnings'], concat(state.warnings, ['email']), state));
    }
  };

  handleRemoveInvitee = (index: number) => {
    const { invitees } = this.state;
    this.setState({
      invitees: remove(index, 1, invitees),
    });
  };

  handleCreateCompany = async () => {
    const { createCompany, setAuthMutationClient, setUserCompanyMutationClient } = this.props;
    const { invitees, companyName: name, chosenPhotoUri } = this.state;
    const inviters = invitees.map(email => ({ email, role: 'employee' }));
    try {
      let file = '';
      if (chosenPhotoUri) {
        file = await convertToApolloUpload([{ uri: chosenPhotoUri }], '=');
      }

      const { data: { createCompany: { company } } } = await createCompany({
        variables: { name, logo: file, inviters },
      });

      const userCompany = {
        id: '1',
        company,
        role: 'admin',
        createdAt: dayjs(Date.now()).format(constants.formats.createUserCompanyDates),
        __typename: 'UserCompany',
      };

      await setUserCompanyMutationClient({ variables: { userCompany } });
      await setAuthMutationClient({ variables: { isAuthed: true } });
    } catch (error) {
      console.log(error.message);
    }
  };

  setPhotoUriCameraCallback = (uri: string) => {
    this.setState({ chosenPhotoUri: uri });
  };

  setPhotoUriLocalCallback = (uri: string) => {
    this.setState({ chosenPhotoUri: uri });
    this.toggleModal();
  };

  toggleModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };

  renderInvitee = ({ item, index }: InviteeProps) => (
    <View style={styles.inviteeContainer}>
      <Text style={styles.inviteeTitle}>{item}</Text>
      <RemoveInviteeButton onPress={() => this.handleRemoveInvitee(index)} />
    </View>
  );

  onChangeField = (field: string, value: string) => {
    this.setState({
      warnings: [],
      [field]: value,
    });
  };

  focusField = (ref: Object) => {
    if (ref) {
      if (isAndroid) {
        this.keyboardAwareScrollView.scrollToFocusedInputWithNodeHandle(ref, normalize(120));
      }
      if (ref.input === undefined) {
        ref.focus();
      } else {
        ref.input.focus();
      }
    }
  }

  validateInput = () => {
    const { companyName } = this.state;
    const warnings = [];

    if (!trim(companyName)) {
      warnings.push('companyName');
    }
  };

  checkValue = () => {
    const { companyName, chosenPhotoUri } = this.state;
    const warnings = [];

    if (!companyName) {
      warnings.push('companyName');
    }

    if (chosenPhotoUri && !isValid(chosenPhotoUri, constants.regExp.photo)) {
      warnings.push('photo');
    }

    this.setState({ warnings }, () => {
      if (isEmpty(warnings)) {
        this.handleCreateCompany();
      }
    });
  };

  checkForWarnings = () => {
    const { warnings } = this.state;
    if (warnings.length) {
      return constants.errors.login[warnings[0]];
    }
    return '';
  };

  emailRef: any;

  keyboardAwareScrollView: any;

  render() {
    const {
      invitees,
      warnings,
      paddingTop,
      companyName,
      marginBottom,
      currentInvitee,
      isModalVisible,
      chosenPhotoUri,
      keyboardPadding,
    } = this.state;

    return (
      <KeyboardAwareScrollView
        bottomOffset={400}
        style={{ backgroundColor: colors.white }}
        ref={(ref) => {
          this.keyboardAwareScrollView = ref;
        }}
      >
        {isAndroid && <StatusBar backgroundColor="white" barStyle="dark-content" />}

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
            { paddingTop },
          ]}
        >
          <Animated.View style={[styles.wrapper, isIOS && { marginBottom }]}>
            <TouchableOpacity style={styles.photo} onPress={this.toggleModal}>
              {chosenPhotoUri && isValid(chosenPhotoUri, constants.regExp.photo) ? (
                <Image style={styles.chosenPhoto} source={{ uri: chosenPhotoUri }} />
              ) : (
                <Text
                  style={[styles.photoHint, includes('photo', warnings) && styles.photoErrorText]}
                >
                  {constants.buttonTitles.chooseLogo}
                </Text>
              )}
            </TouchableOpacity>
            <Text style={[styles.hiddenError, includes('photo', warnings) && styles.photoErrorText]}>
              {constants.errors.login.companyLogo}
            </Text>
            <Input
              isWhite
              value={companyName}
              blurOnSubmit={false}
              placeholder="Введите"
              type={constants.inputTypes.companyName}
              isWarning={includes('companyName', warnings)}
              onSubmitEditing={() => this.focusField(this.emailRef)}
              onChangeText={text => this.onChangeField('companyName', text)}
            />
            <Input
              isWhite
              value={currentInvitee}
              fieldRef={(ref) => {
                this.emailRef = ref;
              }}
              returnKeyType="go"
              blurOnSubmit={false}
              placeholder="e-mail"
              onSubmitForm={this.handleAddInvitee}
              type={constants.inputTypes.invitees}
              onChangeText={text => this.onChangeField('currentInvitee', text)}
              isWarning={or(includes('emailEmpty', warnings), includes('email', warnings))}
            >
              <AddButton onPress={this.handleAddInvitee} />
            </Input>
            <FlatList
              horizontal
              data={invitees}
              style={styles.inviteeList}
              keyExtractor={item => item}
              renderItem={this.renderInvitee}
              showsHorizontalScrollIndicator={false}
            />
          </Animated.View>
          <Button
            onPress={this.checkValue}
            title={constants.buttonTitles.createCompany}
          />
          <PickPhotoModal
            isModalVisible={isModalVisible}
            toggleModalCallback={this.toggleModal}
            navigationCallback={this.handleOpenCamera}
            setPhotoUriLocalCallback={this.setPhotoUriLocalCallback}
          />
        </Animated.View>
      </KeyboardAwareScrollView>
    );
  }
}
export default compose(
  graphql(MUTATIONS.SET_AUTH_MUTATION_CLIENT, {
    name: 'setAuthMutationClient',
  }),
  graphql(MUTATIONS.CREATE_COMPANY_MUTATION, {
    name: 'createCompany',
  }),
  graphql(MUTATIONS.SET_USER_COMPANY_MUTATION_CLIENT, {
    name: 'setUserCompanyMutationClient',
  }),
)(CreateCompany);
