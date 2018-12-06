//  @flow
import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';

import { RNCamera } from 'react-native-camera';

import colors from 'global/colors';
import constants from 'global/constants';
import icons from 'global/assets';
import type { CameraSceneProps, CameraSceneState } from './types';
import styles from './styles';

class Camera extends Component<CameraSceneProps, CameraSceneState> {
  static navigationOptions = {
    header: null,
  };

  state = {
    type: RNCamera.Constants.Type.back,
    flashMode: RNCamera.Constants.FlashMode.off,
  };

  takePicture = async () => {
    const { navigation } = this.props;
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const { uri } = await this.camera.takePictureAsync(options);
      const setPhotoUriCameraCallback = navigation.getParam(
        'setPhotoUriCameraCallback',
        'none'
      );
      setPhotoUriCameraCallback(uri);
      navigation.goBack();
    }
  };

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

  flipCamera = () => {
    const { type } = this.state;
    this.setState({
      type:
        type === RNCamera.Constants.Type.back
          ? RNCamera.Constants.Type.front
          : RNCamera.Constants.Type.back,
    });
  };

  camera: ?RNCamera;

  render() {
    const { flashMode, type } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.toggleFlash}
          >
            <Image source={icons.flash} style={styles.flashImage} />
            <Text style={styles.flashTitle}>
              {flashMode
                ? constants.buttonTitles.on
                : constants.buttonTitles.off}
            </Text>
          </TouchableOpacity>
        </View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          type={type}
          flashMode={flashMode}
          style={styles.preview}
        />
        <View style={styles.bottomSection}>
          <TouchableOpacity onPress={this.returnBack}>
            <Text style={{ color: colors.white }}>
              {constants.buttonTitles.cancel}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <View style={styles.captureInner} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.flipCamera}>
            <Image source={icons.flip} style={styles.flipImage} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Camera;
