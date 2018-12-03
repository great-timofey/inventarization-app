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

import colors from 'global/colors';
import styles from './styles';

type Props = {
  isModalVisible: boolean,
  onBackCallback: () => void,
  navigationCallback: () => void,
};

type State = {
  photos: Array<String>,
};
class PickPhotoModal extends PureComponent<Props, State> {
  state = {
    photos: ['placeholder'],
  };

  componentDidMount() {
    const { photos } = this.state;
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All',
    }).then(data => this.setState({ photos: [photos, ...data.edges] }));
  }

  handleTakePhoto = () => {
    const { navigationCallback } = this.props;
    console.log('take');
    navigationCallback();
  };

  handleChoosePhoto = () => {
    console.log('choose');
  };

  handleOpenImageGallery = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    console.log('opening library');
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
    });
  };

  renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        width: 82,
        height: 82,
        backgroundColor: colors.backGroundBlack,
        marginLeft: 10,
      }}
      onPress={index === 0 ? this.handleTakePhoto : this.handleChoosePhoto}
    >
      {index > 0 && (
        <ImageBackground
          source={{ uri: item.node.image.uri }}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </TouchableOpacity>
  );

  render() {
    const { photos } = this.state;
    const { onBackCallback, isModalVisible } = this.props;
    return (
      <Modal
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
        isVisible={isModalVisible}
        onBackdropPress={onBackCallback}
        onBackButtonPress={onBackCallback}
      >
        <View
          style={{
            height: 150,
            paddingTop: 10,
            borderRadius: 7,
            marginBottom: 15,
            backgroundColor: 'white',
          }}
        >
          {photos.length === 0 ? (
            <ActivityIndicator />
          ) : (
            <View style={{ justifyContent: 'space-between' }}>
              <FlatList
                horizontal
                data={photos}
                keyExtractor={(item, index) =>
                  index > 0 ? item.node.image.uri : 'key'
                }
                renderItem={this.renderItem}
                showsHorizontalScrollIndicator={false}
              />
              <TouchableOpacity
                style={{
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={this.handleOpenImageGallery}
              >
                <Text style={{ fontSize: 18, color: colors.buttonBlue }}>
                  Выбрать фото
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: colors.cancel,
            borderRadius: 7,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onBackCallback}
        >
          <Text style={{ fontSize: 18, color: 'white' }}>Отмена</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default PickPhotoModal;
