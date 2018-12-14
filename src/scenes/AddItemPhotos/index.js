//  @flow

import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  CameraRoll,
  TouchableOpacity,
} from 'react-native';

import { concat, assoc, remove } from 'ramda';
import { RNCamera } from 'react-native-camera';

import assets from 'global/assets';
import constants from 'global/constants';
import type { Props, State, PhotoProps } from './types';
import styles from './styles';

const HeaderSkipButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.skipButtonText}>{constants.buttonTitles.next}</Text>
  </TouchableOpacity>
);

const HeaderBackButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={assets.headerBackArrow} style={styles.backButton} />
  </TouchableOpacity>
);

class AddItemPhotos extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerStyle: styles.header,
    title: constants.headers.newItem,
    headerTitleStyle: styles.headerTitleStyle,
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} />,
    headerRight: <HeaderSkipButton onPress={() => {}} />,
  });

  state = {
    photos: [],
    isHintOpened: true,
    flashMode: RNCamera.Constants.FlashMode.off,
  };

  componentDidMount() {
    setTimeout(
      () => this.setState(state => assoc('isHintOpened', false, state)),
      3000
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const { uri } = await this.camera.takePictureAsync(options);
      this.setState(state => assoc('isHintOpened', false, state));
      CameraRoll.saveToCameraRoll(uri);
      this.setState(state =>
        assoc('photos', concat(state.photos, [uri]), state)
      );
    }
  };

  removePicture = (index: number) => {
    this.setState(state =>
      assoc('photos', remove(index, 1, state.photos), state)
    );
  };

  renderPhoto = ({ item, index }: PhotoProps) => (
    <View style={styles.photoContainer}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.removePhotoIcon}
        onPress={() => this.removePicture(index)}
      >
        <Image source={assets.deletePhoto} />
      </TouchableOpacity>
      <Image source={{ uri: item }} style={styles.photoImage} />
    </View>
  );

  toggleFlash = () => {
    const { flashMode } = this.state;
    this.setState({
      flashMode:
        flashMode === RNCamera.Constants.FlashMode.off
          ? RNCamera.Constants.FlashMode.on
          : RNCamera.Constants.FlashMode.off,
    });
  };

  returnBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  camera: ?RNCamera;

  render() {
    const { flashMode, isHintOpened, photos } = this.state;
    return (
      <View style={styles.container}>
        {isHintOpened && (
          <View style={styles.hint}>
            <Text style={styles.hintText}>{constants.hints.makePhotos}</Text>
          </View>
        )}
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          flashMode={flashMode}
          style={styles.preview}
        />
        <TouchableOpacity
          onPress={this.toggleFlash}
          style={flashMode ? styles.flashOnButton : styles.flashOffButton}
        >
          <Image
            source={flashMode ? assets.flashOff : assets.flashOn}
            style={flashMode ? styles.flashIconOff : styles.flashIconOn}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.takePicture}
          style={styles.makePhotoButton}
        >
          <Image source={assets.logo} style={styles.makePhotoButtonImage} />
        </TouchableOpacity>
        <View style={styles.bottomSection}>
          <FlatList
            horizontal
            data={photos}
            style={styles.photosOuter}
            renderItem={this.renderPhoto}
            contentContainerStyle={styles.photosInner}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

export default AddItemPhotos;
