// @flow

import React, { PureComponent } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native';

import { assoc } from 'ramda';
import Torch from 'react-native-torch';
import QRCodeScanner from 'react-native-qrcode-scanner';

import ScannerMarker from '~/components/ScannerMarker';

import colors from '~/global/colors';
import assets from '~/global/assets';
import constants from '~/global/constants';
import * as SCENE_NAMES from '~/navigation/scenes';
import type { Props, State } from './types';
import styles from './styles';

const HeaderSkipButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.skipButtonText}>{constants.buttonTitles.skip}</Text>
  </TouchableOpacity>
);

const HeaderBackButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={assets.headerBackArrow} style={styles.backButton} />
  </TouchableOpacity>
);

class QRCode extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    title: constants.headers.qrscanner,
    headerTitleStyle: styles.headerTitleStyle,
    headerStyle: styles.header,
    headerLeft: (
      <HeaderBackButton onPress={() => navigation.navigate(SCENE_NAMES.ItemsSceneName)} />
    ),
    headerRight: (
      <HeaderSkipButton onPress={() => navigation.navigate(SCENE_NAMES.AddItemPhotosSceneName)} />
    ),
  });

  constructor(props: Props) {
    super(props);
    this.state = {
      isTorchOn: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this._navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  toggleTorch = () => {
    const { isTorchOn } = this.state;
    this.setState(state => assoc('isTorchOn', !state.isTorchOn, state));
    Torch.switchState(isTorchOn);
  };

  render() {
    const { isTorchOn } = this.state;
    return (
      <View style={styles.container}>
        <QRCodeScanner
          reactivate
          showMarker
          onRead={() => {}}
          reactivateTimeout={1000}
          cameraStyle={styles.scannerCameraStyle}
          customMarker={<ScannerMarker opacity={0.4} color={colors.black} />}
        />
        <TouchableOpacity style={styles.torchButton} onPress={this.toggleTorch}>
          <Image source={isTorchOn ? assets.torchOn : assets.torchOff} style={styles.torchIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.makePhotoButton} disabled>
          <Image source={assets.logo} style={styles.makePhotoButtonImage} />
        </TouchableOpacity>
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>{constants.text.qrhint}</Text>
        </View>
      </View>
    );
  }
}

export default QRCode;
