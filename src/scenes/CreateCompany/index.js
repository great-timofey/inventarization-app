// @flow

import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Alert,
  Image,
  Keyboard,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import { graphql, compose } from 'react-apollo';
import ImageResizer from 'react-native-image-resizer';
import { ReactNativeFile } from 'apollo-upload-client';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { or, isEmpty, concat, assoc, remove, trim, includes } from 'ramda';

import Input from 'components/Input';
import Button from 'components/Button';
import Warning from 'components/Warning';
import AddButton from 'components/AddButton';
import HeaderTitle from 'components/HeaderTitle';
import PickPhotoModal from 'components/PickPhotoModal';
import HeaderBackbutton from 'components/HeaderBackButton';

import colors from 'global/colors';
import constants from 'global/constants';
import globalStyles from 'global/styles';
import * as SCENE_NAMES from 'navigation/scenes';
import { normalize, isValid } from 'global/utils';
import * as MUTATIONS from 'graphql/auth/mutations';
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
    };
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
      this.setState(state =>
        assoc(['warnings'], concat(state.warnings, ['email']), state)
      );
    }
  };

  handleRemoveInvitee = (index: number) => {
    const { invitees } = this.state;
    this.setState({
      invitees: remove(index, 1, invitees),
    });
  };

  handleInputInvitee = (currentInvitee: string) =>
    this.setState({ currentInvitee });

  handleInputCompanyName = (companyName: string) =>
    this.setState({ companyName });

  handleCreateCompany = async () => {
    const { createCompany, setAuthMutationClient } = this.props;
    const { invitees, companyName: name, chosenPhotoUri } = this.state;
    const inviters = invitees.map(email => ({ email, role: 'employee' }));
    try {
      let file = '';
      if (chosenPhotoUri) {
        const type = chosenPhotoUri
          .slice(chosenPhotoUri.lastIndexOf('=') + 1)
          .toUpperCase();
        const response = await ImageResizer.createResizedImage(
          chosenPhotoUri,
          constants.uploadCreateCompanyImages.width,
          constants.uploadCreateCompanyImages.height,
          type === 'JPG' ? 'JPEG' : type,
          constants.uploadCreateCompanyImages.quality
        );

        file = new ReactNativeFile({
          uri: response.uri.replace('file://', ''),
          name: 'a.jpg',
          type: type === 'JPG' ? 'image/jpeg' : 'image/png',
        });
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
      currentInvitee,
      isModalVisible,
      chosenPhotoUri,
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
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
            isWarning={includes('companyName', warnings)}
            type={constants.inputTypes.companyName}
            onSubmitEditing={() => this.focusField(this.emailRef)}
            onChangeText={text => this.onChangeField('companyName', text)}
          />
          <Input
            isWhite
            value={currentInvitee}
            fieldRef={ref => {
              this.emailRef = ref;
            }}
            blurOnSubmit={false}
            placeholder="e-mail"
            type={constants.inputTypes.invitees}
            isWarning={or(
              includes('email', warnings),
              includes('emailEmpty', warnings)
            )}
            onChangeText={text => this.onChangeField('currentInvitee', text)}
            onSubmitEditing={() => Keyboard.dismiss()}
          >
            <AddButton onPress={this.handleAddInvitee} />
          </Input>
        </View>
        <FlatList
          horizontal
          data={invitees}
          style={styles.inviteeList}
          keyExtractor={item => item}
          renderItem={this.renderInvitee}
          showsHorizontalScrollIndicator={false}
        />
        <Button
          onPress={this.validateInput}
          title={constants.buttonTitles.createCompany}
        />
        <PickPhotoModal
          isModalVisible={isModalVisible}
          toggleModalCallback={this.toggleModal}
          navigationCallback={this.handleOpenCamera}
          setPhotoUriLocalCallback={this.setPhotoUriLocalCallback}
        />
        <Warning
          isVisible={warnings.length > 0}
          title={this.checkForWarnings()}
        />
      </View>
    );
  }
}

export default compose(
  graphql(MUTATIONS.SET_AUTH_MUTATION_CLIENT, {
    name: 'setAuthMutationClient',
  }),
  graphql(MUTATIONS.CREATE_COMPANY_MUTATION, {
    name: 'createCompany',
  })
)(CreateCompany);
