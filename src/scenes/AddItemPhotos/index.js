//  @flow

import React, { PureComponent } from 'react';
import { Text, Image, FlatList, View, TouchableOpacity } from 'react-native';

import { assoc } from 'ramda';
import { RNCamera } from 'react-native-camera';

import assets from 'global/assets';
import { normalize } from 'global/utils';
import constants from 'global/constants';
import type { Props, State } from './types';
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
      const shoot = await this.camera.takePictureAsync(options);
      this.setState(state => assoc('isHintOpened', false, state));
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

  //  TODO: add photo previews

  render() {
    const { flashMode, isHintOpened } = this.state;
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
          <FlatList data={[]} renderItem={() => {}} />
        </View>
      </View>
    );
  }
}

export default AddItemPhotos;
