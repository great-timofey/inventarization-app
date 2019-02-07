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

import RNFS from 'react-native-fs';
import { compose, graphql } from 'react-apollo';
// $FlowFixMe
import { RNCamera } from 'react-native-camera';
import { all, assoc, remove, concat, values, equals } from 'ramda';
// $FlowFixMe
import Permissions from 'react-native-permissions';

import colors from '~/global/colors';
import { isAndroid, isIOS } from '~/global/device';
import { convertToApolloUpload, getCurrentLocation } from '~/global/utils';
import assets from '~/global/assets';
import constants from '~/global/constants';
import PhotoPreview from '~/components/PhotoPreview';
import * as SCENE_NAMES from '~/navigation/scenes';
import * as ASSETS_QUERIES from '~/graphql/assets/queries';
import * as ASSETS_MUTATIONS from '~/graphql/assets/mutations';
import { GET_CURRENT_USER_COMPANY_CLIENT } from '~/graphql/auth/queries';

import type { Props, State, PhotosProps } from './types';
import styles from './styles';

const HeaderFinishButton = ({ onPress }: { onPress: Function }) => (
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
    const photos = navigation.state.params && navigation.state.params.photos;
    const defectPhotos = navigation.state.params && navigation.state.params.defectPhotos;
    const location = navigation.state.params && navigation.state.params.location;
    const codeData = navigation.state.params && navigation.state.params.codeData;
    const from = navigation.state.params && navigation.state.params.from;
    const handleGoBack = navigation.state.params && navigation.state.params.handleGoBack;

    let toPass = from
      ? { additionalDefects: defectPhotos }
      : { photos, defectPhotos, codeData, location };

    const handleCreateAsset = navigation.state.params && navigation.state.params.handleCreateAsset;

    return {
      headerStyle: styles.header,
      title: constants.headers.defects,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: <HeaderBackButton onPress={handleGoBack} />,
      headerRight: (
        <HeaderFinishButton
          onPress={async () => {
            if (from) {
              navigation.navigate(SCENE_NAMES.ItemFormSceneName, toPass);
            } else if (photos.length + defectPhotos.length) {
              const response = await handleCreateAsset();
              toPass = { ...toPass, ...response };
              navigation.navigate(SCENE_NAMES.AddItemFinishSceneName, toPass);
            } else {
              Alert.alert(constants.errors.camera.needPhoto);
            }
          }}
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
    });
    setTimeout(() => this.setState({ isHintOpened: false }), 3000);
    navigation.setParams({
      defectPhotos: [],
      handleGoBack: this.handleGoBack,
      handleCreateAsset: this.handleCreateAsset,
    });
    if (isAndroid) {
      this.navListenerFocusAndroid = navigation.addListener('willFocus', () => this.setState({ showCamera: true }));
      this.navListenerBlurAndroid = navigation.addListener('willBlur', () => this.setState({ showCamera: false }));
    }
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

  handleCreateAsset = async () => {
    const {
      navigation,
      createAsset,
      setCreatedAssetsCount,
      userCompany: {
        company: { id: companyId },
      },
      createdAssetsCount: oldCreatedAssetsCount,
    } = this.props;

    const photos = navigation.getParam('photos', []);
    const defectPhotos = navigation.getParam('defectPhotos', []);

    const location = navigation.getParam('location', '');
    const gps = { lat: location.lat, lon: location.lon };

    const createdAssetsCount = oldCreatedAssetsCount + 1;
    const name = `Предмет ${createdAssetsCount}`;
    await setCreatedAssetsCount({ variables: { createdAssetsCount } });

    const variables = { companyId, gps, name };

    if (photos.length) {
      try {
        const photosObjs = photos.map(uri => ({ uri }));
        const photosResult = await convertToApolloUpload(photosObjs, '.');
        //  $FlowFixMe
        variables.photos = photosResult;
      } catch (error) {
        console.log(error.message);
      }
    }

    if (defectPhotos.length) {
      try {
        const defectPhotosObjs = defectPhotos.map(uri => ({ uri }));
        const defectsResult = await convertToApolloUpload(defectPhotosObjs, '.');
        //  $FlowFixMe
        variables.photosOfDamages = defectsResult;
      } catch (error) {
        console.log(error.message);
      }
    }

    try {
      const {
        data: {
          createAsset: { id, inventoryId },
        },
      } = await createAsset({ variables, update: this.updateCreateAsset });
      return { id, inventoryId };
    } catch (error) {
      console.log(error.message);
      return {};
    }
  };

  updateCreateAsset = (cache: Object, payload: Object) => {
    const {
      userCompany: {
        company: { id: companyId },
      },
    } = this.props;
    const data = cache.readQuery({
      query: ASSETS_QUERIES.GET_COMPANY_ASSETS,
      variables: { companyId },
    });
    data.assets.push(payload.data.createAsset);
    cache.writeQuery({ query: ASSETS_QUERIES.GET_COMPANY_ASSETS, variables: { companyId }, data });
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
    const {
      props: { navigation },
    } = this;
    const { isHintOpened, needToAskPermissions } = this.state;
    this.setState({ isLoading: true });

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
        () => navigation.setParams({ defectPhotos: this.state.photos }),
      );
    } else {
      Alert.alert(constants.errors.camera.location);
    }

    this.setState({ isLoading: false });
  };

  removePicture = async (index: number) => {
    const {
      props: { navigation },
      state: { photos },
    } = this;

    try {
      RNFS.unlink(photos[index]);
    } catch (error) {
      Alert.alert(error.message);
    }

    this.setState(
      state => assoc('photos', remove(index, 1, state.photos), state),
      //  eslint-disable-next-line
      () => navigation.setParams({ defectPhotos: this.state.photos }),
    );
  };

  renderPhoto = ({ item: uri, index }: PhotosProps) => (
    <PhotoPreview
      uri={uri}
      index={index}
      removePictureCallback={this.removePicture}
    />
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
        <View style={[styles.hint, !isHintOpened && { display: 'none' }]}>
          <Text style={styles.hintText}>{constants.hints.makeDefectsPhotos}</Text>
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

export default compose(
  graphql(ASSETS_MUTATIONS.CREATE_ASSET, { name: 'createAsset' }),
  graphql(ASSETS_MUTATIONS.SET_CREATED_ASSETS_COUNT_CLIENT, { name: 'setCreatedAssetsCount' }),
  graphql(GET_CURRENT_USER_COMPANY_CLIENT, {
    // $FlowFixMe
    props: ({ data: { userCompany } }) => ({ userCompany }),
  }),
  graphql(ASSETS_QUERIES.GET_CREATED_ASSETS_COUNT_CLIENT, {
    // $FlowFixMe
    props: ({ data: { createdAssetsCount } }) => ({ createdAssetsCount }),
  }),
)(AddItemDefects);
