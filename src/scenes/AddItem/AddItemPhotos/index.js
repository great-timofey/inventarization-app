//  @flow

import React, { PureComponent, Fragment } from 'react';
import {
  Text,
  View,
  Alert,
  Image,
  FlatList,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

//  $FlowFixMe
import Permissions from 'react-native-permissions';
import RNFS from 'react-native-fs';
// $FlowFixMe
import { RNCamera } from 'react-native-camera';
import { all, equals, values, assoc, remove, concat } from 'ramda';

import { isAndroid, isIOS } from '~/global/device';
import { getCurrentLocation } from '~/global/utils';
import colors from '~/global/colors';
import assets from '~/global/assets';
import constants from '~/global/constants';
import * as SCENE_NAMES from '~/navigation/scenes';
import PhotoPreview from '~/components/PhotoPreview';

import type { Props, State, PhotosProps } from './types';
import styles from './styles';

const HeaderSkipButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.skipButtonText}>{constants.buttonTitles.next}</Text>
  </TouchableOpacity>
);

const HeaderBackButton = ({ onPress }: { onPress: ?Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={assets.headerBackArrow} style={styles.backButton} />
  </TouchableOpacity>
);

class AddItemPhotos extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => {
    const from = navigation.state.params && navigation.state.params.from;
    const photos = navigation.state.params && navigation.state.params.photos;
    const codeData = navigation.state.params && navigation.state.params.codeData;
    const location = navigation.state.params && navigation.state.params.location;
    const isLoading = navigation.state.params && navigation.state.params.isLoading;
    const toPass = from ? { additionalPhotos: photos } : { photos, codeData, location };
    const handleGoBack = navigation.state.params && navigation.state.params.handleGoBack;

    return {
      headerStyle: styles.header,
      title: from ? constants.headers.addPhotos : constants.headers.newItem,
      headerTitleStyle: from ? styles.headerTitleSmallStyle : styles.headerTitleStyle,
      headerLeft: <HeaderBackButton onPress={!isLoading ? handleGoBack : null} />,
      headerRight: (
        <HeaderSkipButton
          onPress={() => !isLoading
            && navigation.navigate(
              from ? SCENE_NAMES.ItemFormSceneName : SCENE_NAMES.AddItemDefectsSceneName,
              toPass,
            )
          }
        />
      ),
    };
  };

  state = {
    photos: [],
    isLoading: false,
    showCamera: isIOS,
    isHintOpened: true,
    ableToTakePicture: false,
    needToAskPermissions: true,
    flashMode: RNCamera.Constants.FlashMode.off,
  };

  navListener: any;
  navListenerBlurAndroid: any;
  navListenerFocusAndroid: any;

  componentDidMount() {
    const { navigation } = this.props;
    this.navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(colors.black);
    });
    setTimeout(() => this.setState({ isHintOpened: false }), 3000);
    if (isAndroid) {
      this.navListenerFocusAndroid = navigation.addListener('willFocus', () => this.setState({ showCamera: true }));
      this.navListenerBlurAndroid = navigation.addListener('didBlur', () => this.setState({ showCamera: false }));
    }
    navigation.setParams({ photos: [], handleGoBack: this.handleGoBack });
  }

  componentWillUnmount() {
    this.navListener.remove();
    if (isAndroid) {
      this.navListenerFocusAndroid.remove();
      this.navListenerBlurAndroid.remove();
    }
  }

  handleGoBack = () => {
    const { navigation } = this.props;
    const from = navigation.getParam('from', null);
    if (from) {
      navigation.pop();
    } else {
      navigation.goBack();
    }
  };

  askPermissions = async () => {
    const currentPermissions = await Permissions.checkMultiple(constants.permissions.photo);

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

    const newPermissions = await Permissions.checkMultiple(constants.permissions.photo);

    if (all(equals('authorized'), values(newPermissions))) {
      this.setState({ ableToTakePicture: true, needToAskPermissions: false });
    }

    return null;
  };

  takePicture = async () => {
    const { navigation } = this.props;
    const { isHintOpened, needToAskPermissions } = this.state;
    this.setState({ isLoading: true }, () => navigation.setParams({ isLoading: true }));

    if (needToAskPermissions) {
      await this.askPermissions();
    }

    const { ableToTakePicture } = this.state;

    if (this.camera && ableToTakePicture) {
      const options = { quality: 0.5 };
      const { uri } = await this.camera.takePictureAsync(options);

      if (isHintOpened) {
        this.setState({ isHintOpened: false });
      }

      const isLocationExists = navigation.getParam('location', '');

      if (!isLocationExists) {
        const location = await getCurrentLocation();
        navigation.setParams({ location });
      }

      this.setState(
        state => assoc('photos', concat(state.photos, [uri]), state),
        // eslint-disable-next-line react/destructuring-assignment
        () => navigation.setParams({ photos: this.state.photos }),
      );
    } else {
      Alert.alert(constants.errors.camera.location);
    }

    this.setState({ isLoading: false }, () => navigation.setParams({ isLoading: false }));
  };

  removePicture = async (index: number) => {
    const { photos } = this.state;
    const { navigation } = this.props;

    try {
      RNFS.unlink(photos[index]);
    } catch (error) {
      Alert.alert(error.message);
    }

    this.setState(
      state => assoc('photos', remove(index, 1, state.photos), state),
      // eslint-disable-next-line react/destructuring-assignment
      () => navigation.setParams({ photos: this.state.photos }),
    );
  };

  renderPhoto = ({ item: uri, index }: PhotosProps) => (
    <PhotoPreview uri={uri} index={index} removePictureCallback={this.removePicture} />
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

  camera: ?RNCamera;

  render() {
    const { flashMode, isHintOpened, photos, isLoading, showCamera } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.hint, (!isHintOpened || isLoading) && { opacity: 0 }]}>
          <Text style={styles.hintText}>{constants.hints.makePhotos}</Text>
        </View>
        {(isLoading || !showCamera) && (
          <View style={styles.hint}>
            <ActivityIndicator size="large" color={colors.accent} />
          </View>
        )}
        {showCamera && (
          <Fragment>
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
        )}
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

export default AddItemPhotos;
