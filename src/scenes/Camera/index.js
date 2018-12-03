import React, { Component } from 'react';
import { View, Button, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

import styles from './styles';

type Props = { navigation: Object };
type State = {
  type: boolean,
  flashMode: boolean,
};

class CameraScene extends Component<Props, State> {
  state = {
    flashMode: RNCamera.Constants.FlashMode.off,
    type: RNCamera.Constants.Type.back,
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flashZone}>
          <Button color="white" onPress={this.toggleFlash} title="Вспышка" />
        </View>

        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={styles.cameraActionsZone}>
          <Button onPress={this.returnBack} title="Назад" color="white" />
          <TouchableOpacity onPress={this.takePicture} style={styles.capture} />
          <Button onPress={this.flipCamera} title="Flip" color="white" />
        </View>
      </View>
    );
  }
}

export default CameraScene;
