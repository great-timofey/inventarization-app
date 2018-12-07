// @flow

import React, { PureComponent } from 'react';
import {
  TextInput,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import R from 'ramda';
import { graphql } from 'react-apollo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Button from 'components/Button';
import AddButton from 'components/AddButton';
import PickPhotoModal from 'components/PickPhotoModal';
import HeaderBackbutton from 'components/HeaderBackButton';

import colors from 'global/colors';
import constants from 'global/constants';
import globalStyles from 'global/styles';
import * as SCENE_NAMES from 'navigation/scenes';
import { CREATE_COMPANY_MUTATION } from 'graphql/auth/mutations';
import { create } from 'handlebars';
import type { Props, State, InviteeProps } from './types';
import styles from './styles';

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
class CreateCompany extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: [globalStyles.authHeaderStyle && styles.newOrganizationHeader],
    headerLeft: HeaderBackbutton({
      onPress: () => navigation.goBack(),
    }),
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      invitees: [],
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

  handleInputCompanyName = (companyName: string) =>
    this.setState({ companyName });

  handleCreateCompany = async () => {
    const { createCompany } = this.props;
    const { invitees: inviters, companyName: name } = this.state;
    try {
      const result = await createCompany({
        variables: { name, inviters },
      });
      console.log(result);
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

  render() {
    const { invitees, isModalVisible, chosenPhotoUri } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{constants.headers.newOrganization}</Text>
        <View style={{ alignItems: 'center' }}>
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
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitleText}>Название организации</Text>

            <TextInput
              style={{
                backgroundColor: '#FAFAFA',
              }}
              placeholder="Введите"
              placeholderTextColor="#C8C8C8"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitleText}>Добавьте людей</Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <TextInput
                style={{
                  backgroundColor: '#FAFAFA',
                }}
                placeholder="e-mail"
                placeholderTextColor="#C8C8C8"
                onChangeText={this.handleInputInvitee}
              />
              <AddButton
                style={styles.inviteeRemove}
                onPress={this.handleAddInvitee}
              />
            </View>
          </View>
        </View>
        <FlatList
          horizontal
          data={invitees}
          style={styles.inviteeList}
          renderItem={this.renderInvitee}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
        />
        <Button
          onPress={this.handleCreateCompany}
          title={constants.buttonTitles.createOrganization}
        />
        <PickPhotoModal
          isModalVisible={isModalVisible}
          toggleModalCallback={this.toggleModal}
          navigationCallback={this.handleOpenCamera}
          setPhotoUriLocalCallback={this.setPhotoUriLocalCallback}
        />
      </View>
    );
  }
}

export default graphql(CREATE_COMPANY_MUTATION, {
  name: 'createOrganization',
})(CreateCompany);
