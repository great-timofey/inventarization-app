//  @flow

import React, { PureComponent, Fragment } from 'react';
import {
  Text,
  View,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import RNFS from 'react-native-fs';
import { RNCamera } from 'react-native-camera';
import {
  all,
  keys,
  assoc,
  remove,
  pickBy,
  concat,
  values,
  equals,
} from 'ramda';
import Permissions from 'react-native-permissions';

import assets from 'global/assets';
import constants from 'global/constants';
import { isSmallDevice } from 'global/utils';
import type { Props, State, PhotosProps } from './types';
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
    isLoading: false,
    isHintOpened: true,
    ableToTakePicture: false,
    needToAskPermissions: true,
    flashMode: RNCamera.Constants.FlashMode.off,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isHintOpened: false }), 3000);
  }

  checkEveryPermissionStatus = (permissions: Object) =>
    all(equals('authorized'), values(permissions));

  askPermissions = async () => {
    const { needToAskPermissions } = this.state;

    const permissions = await Permissions.checkMultiple(['location', 'camera']);

    if (!this.checkEveryPermissionStatus(permissions)) {
      const notGrantedKeys = keys(
        pickBy(val => val !== 'authorized', permissions)
      );
      notGrantedKeys.forEach(item => Permissions.request(item));
      const userPermissions = await Promise.all(notGrantedKeys);

      const isAllOk = this.checkEveryPermissionStatus(userPermissions);
      if (!isAllOk) return null;
    }

    if (needToAskPermissions)
      this.setState({ needToAskPermissions: false, ableToTakePicture: true });

    return null;
  };

  takePicture = async () => {
    const { isHintOpened, needToAskPermissions } = this.state;
    this.setState({ isLoading: true });

    if (needToAskPermissions) await this.askPermissions();

    const { ableToTakePicture } = this.state;

    if (this.camera && ableToTakePicture) {
      const options = { quality: 0.5, base64: true };
      const { base64, uri } = await this.camera.takePictureAsync(options);

      if (isHintOpened) this.setState({ isHintOpened: false });

      this.setState(state =>
        assoc('photos', concat(state.photos, [{ base64, uri }]), state)
      );
    }

    this.setState({ isLoading: false });
  };

  removePicture = async (index: number) => {
    const { photos } = this.state;
    const { uri } = photos[index];

    try {
      RNFS.unlink(uri);
    } catch (error) {
      Alert.alert(error.message);
    }

    this.setState(state =>
      assoc('photos', remove(index, 1, state.photos), state)
    );
  };

  renderPhoto = ({ item: { base64 }, index }: PhotosProps) => (
    <View style={styles.photoContainer}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.removePhotoIcon, isSmallDevice && styles.smallerIcon]}
        onPress={() => this.removePicture(index)}
      >
        <Image source={assets.deletePhoto} />
      </TouchableOpacity>
      <Image
        style={styles.photoImage}
        source={{ uri: `data:image/jpeg;base64,${base64}` }}
      />
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
    const { flashMode, isHintOpened, photos, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <Fragment>
          <View style={[styles.hint, !isHintOpened && { display: 'none' }]}>
            <Text style={styles.hintText}>{constants.hints.makePhotos}</Text>
          </View>
          {isLoading && (
            <View style={styles.hint}>
              <ActivityIndicator />
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
        </Fragment>
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
