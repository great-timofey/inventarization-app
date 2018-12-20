//  @flow

import React, { PureComponent, Fragment } from 'react';
import {
  Text,
  View,
  Alert,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import RNFS from 'react-native-fs';
import { RNCamera } from 'react-native-camera';
import { all, assoc, remove, concat, values, equals } from 'ramda';
// $FlowFixMe
import Permissions from 'react-native-permissions';

import assets from '~/global/assets';
import constants from '~/global/constants';
import { isSmallDevice } from '~/global/utils';
import * as SCENE_NAMES from '~/navigation/scenes';
import type { Props, State, PhotosProps } from './types';
import styles from './styles';

const necessaryPermissions = ['location', 'camera']

const HeaderSkipButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.skipButtonText}>{constants.buttonTitles.ready}</Text>
  </TouchableOpacity>
);

const HeaderBackButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={assets.headerBackArrow} style={styles.backButton} />
  </TouchableOpacity>
);

class AddItemDefects extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => {
    const photos = navigation.getParam('photos', []);
    const defectPhotos = navigation.getParam('defectPhotos', []);
    return {
      headerStyle: styles.header,
      title: constants.headers.defects,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} />,
      headerRight: (
        <HeaderSkipButton onPress={() => 
          photos.length + defectPhotos.length
          ? navigation.navigate(SCENE_NAMES.AddItemFinishSceneName, { photos, defectPhotos }) 
          : Alert.alert('Требуется фото предмета или его дефектов для продолежния')} 
        />
      ),
    };
  };

  state = {
    photos: [],
    isLoading: false,
    isHintOpened: true,
    ableToTakePicture: false,
    needToAskPermissions: true,
    flashMode: RNCamera.Constants.FlashMode.off,
  };

  componentDidMount() {
    const { navigation } = this.props;
    setTimeout(() => this.setState({ isHintOpened: false }), 3000);
    navigation.setParams({ defectPhotos: [] });
  }

  askPermissions = async () => {
    const currentPermissions = await Permissions.checkMultiple(necessaryPermissions);

    if (all(equals('authorized'), values(currentPermissions))) {
      this.setState({ ableToTakePicture: true, needToAskPermissions: false });
      return null;
    }

    if (currentPermissions.camera !== 'authorized') {
      await Permissions.request('camera');
    }
    if (currentPermissions.location !== 'authorized') {
      await Permissions.request('location');
    }

    const newPermissions = await Permissions.checkMultiple(necessaryPermissions);

    if (all(equals('authorized'), values(newPermissions))) {
      this.setState({ ableToTakePicture: true, needToAskPermissions: false });
    }

    return null;
  };

  takePicture = async () => {
    const { navigation } = this.props;
    const { isHintOpened, needToAskPermissions } = this.state;
    this.setState({ isLoading: true });

    if (needToAskPermissions) await this.askPermissions();

    const { ableToTakePicture } = this.state;

    if (this.camera && ableToTakePicture) {
      const options = { quality: 0.5, base64: true };
      const { base64, uri } = await this.camera.takePictureAsync(options);

      if (isHintOpened) this.setState({ isHintOpened: false });

      let location = new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude: lat, longitude: lon } }) => {
            location = { lat, lon };
            res();
          },
          error => rej(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      });

      await location;
      const takenPhoto = { base64, uri, location };

      this.setState(
        state => assoc('photos', concat(state.photos, [takenPhoto]), state), 
        () => navigation.setParams({ defectPhotos: this.state.photos })
      );
    } else {
      Alert.alert('Не можем сделать фотографию без доступа к вашему местоположению');
    }

    this.setState({ isLoading: false });
  };

  removePicture = async (index: number) => {
    const { photos } = this.state;
    const { navigation } = this.props;

    const { uri } = photos[index];

    try {
      RNFS.unlink(uri);
    } catch (error) {
      Alert.alert(error.message);
    }

    this.setState(
      state => assoc('photos', remove(index, 1, state.photos), state), 
      () => navigation.setParams({ defectPhotos: this.state.photos })
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
      <Image style={styles.photoImage} source={{ uri: `data:image/jpeg;base64,${base64}` }} />
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
      <SafeAreaView style={styles.container}>
        <Fragment>
          <View style={[styles.hint, !isHintOpened && { display: 'none' }]}>
            <Text style={styles.hintText}>{constants.hints.makeDefectsPhotos}</Text>
          </View>
          {isLoading && (
            <View style={styles.hint}>
              <ActivityIndicator />
            </View>
          )}
          <RNCamera
            ref={(ref) => {
              this.camera = ref;
            }}
            flashMode={flashMode}
            style={styles.preview}
          />
          <TouchableOpacity
            onPress={this.toggleFlash}
            style={[styles.flashButton, flashMode ? styles.flashOn : styles.flashOff]}
          >
            <Image
              source={flashMode ? assets.flashOff : assets.flashOn}
              style={flashMode ? styles.flashIconOff : styles.flashIconOn}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.takePicture} style={styles.makePhotoButton}>
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
      </SafeAreaView>
    );
  }
}

export default AddItemDefects;