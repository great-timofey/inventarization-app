//  @flow
import React, { PureComponent } from 'react';
import {
  Text,
  View,
  FlatList,
  CameraRoll,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';

import type { Props, State, PhotoType } from './types';
import styles from './styles';

class PickPhotoModal extends PureComponent<Props, State> {
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

  handleChoosePhoto = () => {
    //  here goes choose photo implementation
  };

  handleOpenImageGallery = () => {
    ImagePicker.launchImageLibrary({}, response => response);
  };

  renderItem = ({ item, index }: PhotoType) => (
    <TouchableOpacity
      style={styles.photo}
      onPress={index === 0 ? this.handleTakePhoto : this.handleChoosePhoto}
    >
      {index > 0 && (
        <ImageBackground
          source={{ uri: item.node.image.uri }}
          style={styles.photoBackgroundImage}
        />
      )}
    </TouchableOpacity>
  );

  render() {
    const { photos } = this.state;
    const { onBackCallback, isModalVisible } = this.props;
    return (
      <Modal
        isVisible={isModalVisible}
        style={styles.modalContainer}
        onBackdropPress={onBackCallback}
        onBackButtonPress={onBackCallback}
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
                <Text style={styles.openGalleryText}>Выбрать фото</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onBackCallback}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Отмена</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default PickPhotoModal;
