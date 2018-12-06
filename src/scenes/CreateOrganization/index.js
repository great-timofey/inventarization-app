// @flow

import React, { PureComponent } from 'react';
import { Image, View, Text, TouchableOpacity, FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from 'components/Button';
import PickPhotoModal from 'components/PickPhotoModal';
import HeaderBackbutton from 'components/HeaderBackButton';

import colors from 'global/colors';
import constants from 'global/constants';
import globalStyles from 'global/styles';
import * as SCENE_NAMES from 'navigation/scenes';
import type { Props, State } from './types';
import styles from './styles';

const RemoveInviteeButton = () => (
  <Icon.Button
    size={34}
    name="cancel"
    activeOpacity={1}
    onPress={() => {}}
    color={colors.white}
    style={styles.inviteeRemove}
    underlayColor={colors.transparent}
    backgroundColor={colors.transparent}
  />
);

class CreateOrganization extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: [globalStyles.authHeaderStyle && styles.newOrganizationHeader],
    headerLeft: HeaderBackbutton({
      onPress: () => navigation.goBack(),
    }),
  });

  constructor(props: Props) {
    super(props);

    this.state = {
      isModalVisible: false,
      data: [
        { id: 1, mail: 'sldkjf@mail.com' },
        { id: 2, mail: 'sldkjf@mail.com' },
        { id: 3, mail: 'sldkjf@mail.com' },
        { id: 4, mail: 'sldkjf@mail.com' },
      ],
      chosenPhotoUri: '',
    };
  }

  handleOpenCamera = () => {
    const { navigation } = this.props;
    this.toggleModal();
    navigation.navigate(SCENE_NAMES.CameraSceneName, {
      setPhotoUriCameraCallback: this.setPhotoUriCameraCallback,
    });
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

  renderItem = ({ item: { id, mail } }) => (
    <View style={styles.inviteeContainer}>
      <Text style={styles.inviteeTitle}>{mail}</Text>
      <RemoveInviteeButton />
    </View>
  );

  render() {
    const { data, isModalVisible, chosenPhotoUri } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{constants.headers.newOrganization}</Text>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.photo} onPress={this.toggleModal}>
            {chosenPhotoUri ? (
              <Image
                source={{ uri: chosenPhotoUri }}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <Text style={styles.photoHint}>
                {constants.buttonTitles.chooseLogo}
              </Text>
            )}
          </TouchableOpacity>
          {/** here goes form */}
          <FlatList
            horizontal
            data={data}
            style={styles.inviteeList}
            renderItem={this.renderItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Button
          onPress={() => {}}
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

export default CreateOrganization;
