// @flow

import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import R from 'ramda';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Input from 'components/Input';
import Button from 'components/Button';
import Warning from 'components/Warning';
import AddButton from 'components/AddButton';
import HeaderTitle from 'components/HeaderTitle';
import PickPhotoModal from 'components/PickPhotoModal';
import HeaderBackbutton from 'components/HeaderBackButton';

import utils from 'global/utils';
import colors from 'global/colors';
import constants from 'global/constants';
import globalStyles from 'global/styles';
import * as SCENE_NAMES from 'navigation/scenes';

import styles from './styles';
import type { Props, State, InviteeProps } from './types';

const RemoveInviteeButton = props => (
  <MaterialIcon.Button
    {...props}
    size={34}
    name="cancel"
    activeOpacity={0.5}
    color={colors.white}
    style={styles.inviteeRemove}
    underlayColor={colors.transparent}
    backgroundColor={colors.transparent}
  />
);
class CreateOrganization extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: [
      globalStyles.authHeaderStyle,
      { backgroundColor: colors.white },
    ],
    headerTitle: HeaderTitle({
      title: constants.headers.newOrganization,
      color: colors.header.newOrganization,
    }),
    headerLeft: HeaderBackbutton({
      onPress: () => navigation.goBack(),
    }),
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      orgName: '',
      invitees: [],
      warnings: [],
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
    this.setState({
      currentInvitee: '',
      invitees: R.concat(invitees, [currentInvitee]),
    });
  };

  handleRemoveInvitee = (index: number) => {
    const { invitees } = this.state;
    this.setState({
      invitees: R.remove(index, 1, invitees),
    });
  };

  handleInputInvitee = (currentInvitee: string) =>
    this.setState({ currentInvitee });

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

  checkValue = () => {
    const { orgName, currentInvitee } = this.state;
    const warnings = [];
    if (!orgName) {
      warnings.push('orgName');
    }
    if (!currentInvitee) {
      warnings.push('emailEmpty');
    } else if (!utils.isValid(currentInvitee, constants.regExp.email)) {
      warnings.push('email');
    }
    this.setState({ warnings });
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

  emailRef: any;

  render() {
    const {
      orgName,
      invitees,
      warnings,
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
            value={orgName}
            blurOnSubmit={false}
            placeholder="Введите"
            isWarning={warnings.includes('orgName')}
            type={constants.inputTypes.orgName}
            onSubmitEditing={() => this.focusField(this.emailRef)}
            onChangeText={text => this.onChangeField('orgName', text)}
          />
          <Input
            isWhite
            value={currentInvitee}
            fieldRef={ref => {
              this.emailRef = ref;
            }}
            returnKeyType="go"
            blurOnSubmit={false}
            placeholder="e-mail"
            onSubmitForm={this.handleAddInvitee}
            type={constants.inputTypes.invitees}
            isWarning={
              warnings.includes('emailEmpty') || warnings.includes('email')
            }
            onChangeText={text => this.onChangeField('currentInvitee', text)}
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
          onPress={this.checkValue}
          title={constants.buttonTitles.createOrganization}
        />
        <PickPhotoModal
          isModalVisible={isModalVisible}
          toggleModalCallback={this.toggleModal}
          navigationCallback={this.handleOpenCamera}
          setPhotoUriLocalCallback={this.setPhotoUriLocalCallback}
        />
        <Warning
          isVisible={this.checkForErrors()}
          title={this.checkForWarnings()}
        />
      </View>
    );
  }
}

export default CreateOrganization;
