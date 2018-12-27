// @flow

import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Alert,
  Image,
  FlatList,
  Keyboard,
  Animated,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import { graphql, compose } from 'react-apollo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { or, isEmpty, concat, assoc, remove, trim, includes } from 'ramda';

import Input from '~/components/Input';
import Button from '~/components/Button';
import AddButton from '~/components/AddButton';
import HeaderTitle from '~/components/HeaderTitle';
import PickPhotoModal from '~/components/PickPhotoModal';
import HeaderBackbutton from '~/components/HeaderBackButton';
import ScrollViewContainer from '~/components/ScrollViewContainer';

import { convertToApolloUpload } from '~/global/utils';
import colors from '~/global/colors';
import constants from '~/global/constants';
import globalStyles from '~/global/styles';
import * as SCENE_NAMES from '~/navigation/scenes';
import * as MUTATIONS from '~/graphql/auth/mutations';
import { normalize, isValid } from '~/global/utils';
import type { Props, State, InviteeProps } from './types';
import styles from './styles';

const RemoveInviteeButton = props => (
  <MaterialIcon.Button
    {...props}
    iconStyle={{ marginRight: 0 }}
    name="cancel"
    activeOpacity={0.5}
    color={colors.white}
    size={normalize(34)}
    style={styles.inviteeRemove}
    underlayColor={colors.transparent}
    backgroundColor={colors.transparent}
  />
);
class CreateCompany extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: [
      globalStyles.authHeaderStyleBig,
      { backgroundColor: colors.white },
    ],
    headerTitle: HeaderTitle({
      color: colors.header.createCompany,
      title: constants.headers.createNewCompany,
    }),
    headerLeft: HeaderBackbutton({
      onPress: () => navigation.goBack(),
    }),
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      invitees: [],
      warnings: [],
      companyName: '',
      chosenPhotoUri: '',
      currentInvitee: '',
      isModalVisible: false,
      keyboardPadding: new Animated.Value(0),
      paddingTop: new Animated.Value(normalize(10)),
      marginBottom: new Animated.Value(normalize(105)),
    };
  }

  componentDidMount() {
    const { keyboardPadding, marginBottom, paddingTop } = this.state;
    const listenerShow = 'keyboardWillShow';
    const listenerHide = 'keyboardWillHide';
    Keyboard.addListener(listenerShow, (event) => {
      Animated.parallel([
        Animated.timing(keyboardPadding, {
          duration: 250,
          toValue: -event.endCoordinates.height,
        }),
        Animated.timing(marginBottom, {
          duration: 250,
          toValue: normalize(10),
        }),
        Animated.timing(paddingTop, {
          duration: 250,
          toValue: normalize(event.endCoordinates.height - 90),
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
          toValue: normalize(105),
        }),
        Animated.timing(paddingTop, {
          duration: 250,
          toValue: normalize(10),
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
      this.setState(state => assoc(['warnings'], concat(state.warnings, ['email']), state));
    }
  };

  handleRemoveInvitee = (index: number) => {
    const { invitees } = this.state;
    this.setState({
      invitees: remove(index, 1, invitees),
    });
  };

  handleInputInvitee = (currentInvitee: string) => this.setState({ currentInvitee });

  handleInputCompanyName = (companyName: string) => this.setState({ companyName });

  handleCreateCompany = async () => {
    const { createCompany, setAuthMutationClient } = this.props;
    const { invitees, companyName: name, chosenPhotoUri } = this.state;
    const inviters = invitees.map(email => ({ email, role: 'employee' }));
    try {
      let file = '';
      if (chosenPhotoUri) {
        file = await convertToApolloUpload([chosenPhotoUri], '=');
      }

      await createCompany({
        variables: { name, logo: file, inviters },
      });

      await setAuthMutationClient({ variables: { isAuthed: true } });
    } catch (error) {
      Alert.alert(error.message);
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
    if (ref.input === undefined) {
      ref.focus();
    } else {
      ref.input.focus();
    }
  };

  validateInput = () => {
    const { companyName } = this.state;
    const warnings = [];

    if (!trim(companyName)) {
      warnings.push('companyName');
    }
  };

  checkValue = () => {
    const { currentInvitee } = this.state;
    const warnings = [];
    if (!currentInvitee) {
      warnings.push('emailEmpty');
    } else if (!isValid(currentInvitee, constants.regExp.email)) {
      warnings.push('email');
    }

    this.setState({ warnings }, () => {
      if (isEmpty(warnings)) this.handleCreateCompany();
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

  render() {
    const {
      invitees,
      warnings,
      companyName,
      paddingTop,
      marginBottom,
      currentInvitee,
      isModalVisible,
      chosenPhotoUri,
      keyboardPadding,
    } = this.state;

    return (
      <ScrollViewContainer bgColor={colors.white}>
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
          <StatusBar barStyle="dark-content" />
          <Animated.View style={[styles.wrapper, { marginBottom }]}>
            <TouchableOpacity style={styles.photo} onPress={this.toggleModal}>
              {chosenPhotoUri ? (
                <Image
                  style={styles.chosenPhoto}
                  source={{ uri: chosenPhotoUri }}
                />
              ) : (
                <Text style={styles.photoHint}>
                  {constants.buttonTitles.chooseLogo}
                </Text>
              )}
            </TouchableOpacity>
            <Input
              isWhite
              value={companyName}
              blurOnSubmit={false}
              placeholder="Введите"
              isWarning={includes('orgName', warnings)}
              type={constants.inputTypes.companyName}
              onSubmitEditing={() => this.focusField(this.emailRef)}
              onChangeText={text => this.onChangeField('orgName', text)}
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
            isDisable={!companyName || !invitees.length}
            title={constants.buttonTitles.createCompany}
          />
          <PickPhotoModal
            isModalVisible={isModalVisible}
            toggleModalCallback={this.toggleModal}
            navigationCallback={this.handleOpenCamera}
            setPhotoUriLocalCallback={this.setPhotoUriLocalCallback}
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
  graphql(MUTATIONS.CREATE_COMPANY_MUTATION, {
    name: 'createCompany',
  }),
)(CreateCompany);
