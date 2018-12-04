//  @flow
import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Alert,
  FlatList,
  CameraRoll,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';

import assets from 'global/assets';
import constants from 'global/constants';
import type { ModalProps, ModalState, PhotoType } from './types';
import styles from './styles';

class PickPhotoModal extends PureComponent<ModalProps, ModalState> {
  state = {
    photos: [{ some: 'placeholder' }],
  };

  componentDidMount() {
    const { photos } = this.state;
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All',
    }).then(data => this.setState({ photos: [photos[0], ...data.edges] }));
  }

  handleTakePhoto = () => {
    const { navigationCallback } = this.props;
    navigationCallback();
  };

  handleChoosePhoto = (uri: string) => {
    const { setPhotoUriCallback } = this.props;
    setPhotoUriCallback(uri);
  };

  handleOpenImageGallery = () => {
    const { toggleModalCallback } = this.props;
    //  $FlowFixMe
    ImagePicker.launchImageLibrary({}, response => {
      if (response.error) {
        Alert.alert(constants.errors.camera.photo);
      } else {
        this.handleChoosePhoto(response.uri);
        toggleModalCallback();
      }
    });
  };

  renderItem = ({ item, index }: PhotoType) => (
    <TouchableOpacity
      style={styles.photo}
      onPress={() =>
        index === 0
          ? this.handleTakePhoto()
          : this.handleChoosePhoto(item.node.image.uri)
      }
    >
      {index > 0 ? (
        <ImageBackground
          source={{ uri: item.node.image.uri }}
          style={styles.photoBackgroundImage}
        />
      ) : (
        <ImageBackground source={assets.camera} style={styles.cameraIcon} />
      )}
    </TouchableOpacity>
  );

  render() {
    const { photos } = this.state;
    const { toggleModalCallback, isModalVisible } = this.props;
    return (
      <Modal
        isVisible={isModalVisible}
        style={styles.modalContainer}
        onBackdropPress={toggleModalCallback}
        onBackButtonPress={toggleModalCallback}
      >
        <View style={styles.choosePhotoContainer}>
          {photos.length === 0 ? (
            <ActivityIndicator />
          ) : (
            <View>
              <FlatList
                horizontal
                data={photos}
                renderItem={this.renderItem}
                contentContainerStyle={styles.photos}
                keyExtractor={(item, index) =>
                  index > 0 ? item.node.image.uri : 'key'
                }
                showsHorizontalScrollIndicator={false}
              />
              <TouchableOpacity
                style={styles.openGalleryButton}
                onPress={this.handleOpenImageGallery}
              >
                <Text style={styles.openGalleryText}>
                  {constants.buttonTitles.choosePhoto}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.cancelButton}
          onPress={toggleModalCallback}
        >
          <Text style={styles.cancelButtonText}>
            {constants.buttonTitles.cancel}
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default PickPhotoModal;
