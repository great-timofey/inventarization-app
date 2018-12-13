//  @flow

import React, { PureComponent } from 'react';
import { Text, Image, FlatList, View, TouchableOpacity } from 'react-native';

import { RNCamera } from 'react-native-camera';

import { assoc } from 'ramda';
import icons from 'global/assets';
import constants from 'global/constants';
import type { Props, State } from './types';
import styles from './styles';

class AddItemPhotos extends PureComponent<Props, State> {
  state = {
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
      const shoot = await this.camera.takePictureAsync(options);
      console.log(shoot);
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

  camera: ?RNCamera;

  render() {
    const { flashMode } = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          flashMode={flashMode}
          style={styles.preview}
        />
        <View style={styles.bottomSection}>
          <FlatList data={[]} renderItem={() => {}} />
        </View>
      </View>
    );
  }
}

export default AddItemPhotos;
