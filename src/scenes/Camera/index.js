//  @flow
import React, { Component } from 'react';
import { View, Button, TouchableOpacity } from 'react-native';

import { RNCamera } from 'react-native-camera';

import colors from 'global/colors';
import type { CameraSceneProps, CameraSceneState } from './types';
import styles from './styles';

class CameraScene extends Component<CameraSceneProps, CameraSceneState> {
  state = {
    type: RNCamera.Constants.Type.back,
    flashMode: RNCamera.Constants.FlashMode.off,
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      return data.uri;
    }
    return null;
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
    return (
      <View style={styles.container}>
        <View style={styles.flashZone}>
          <Button
            title="Вспышка"
            color={colors.white}
            onPress={this.toggleFlash}
          />
        </View>

        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
        />
        <View style={styles.cameraActionsZone}>
          <Button
            title="Назад"
            color={colors.white}
            onPress={this.returnBack}
          />
          <TouchableOpacity onPress={this.takePicture} style={styles.capture} />
          <Button onPress={this.flipCamera} title="Flip" color={colors.white} />
        </View>
      </View>
    );
  }
}

export default CameraScene;
