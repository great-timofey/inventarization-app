// @flow

import React, { PureComponent, Fragment } from 'react';
import Svg, { Path } from 'react-native-svg';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Modal from 'react-native-modal';
import { assoc } from 'ramda';
import Torch from 'react-native-torch';
// import QRView from 'react-native-qrcode-svg';
// import { RNCamera } from 'react-native-camera';
// import Barcode from 'react-native-barcode-builder';
import QRCodeScanner from 'react-native-qrcode-scanner';

import assets from 'global/assets';
import Icon from 'assets/InventoryIcon';
import constants from 'global/constants';
import type { Props, State } from './types';
import styles from './styles';

const CustomMarker = () => (
  <Svg
    style={{ marginTop: -125 }}
    height={583}
    width={333}
    viewBox="0 0 100 100"
  >
    <Path
      opacity=".5"
      d=" M0 0 h100 v200 H0V0 z m16 18 a4 4 0 0 0 -4 4 v62 a4 4 0 0 0 4 4 h68 a4 4 0 0 0 4 -4 V22 a4 4 0 0 0 -4 -4 H50 z "
      fillRule="evenodd"
      fill="#000"
    />
  </Svg>
);

class QRCode extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    title: constants.headers.qrscanner,
    headerTitleStyle: styles.headerTitleStyle,
    headerStyle: styles.header,
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={assets.headerBackArrow} style={styles.backButton} />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity>
        <Text style={styles.skipButtonText}>{constants.buttonTitles.skip}</Text>
      </TouchableOpacity>
    ),
  });

  constructor(props: Props) {
    super(props);
    this.state = {
      barcode: '',
      isTorchOn: true,
    };
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
          reactivateTimeout={1000}
          onRead={e => {
            console.log(e);
            // const toDecode = btoa(e.data);
            // console.log('base64 string:', toDecode);
          }}
          cameraStyle={styles.scannerCameraStyle}
          showMarker
          customMarker={<CustomMarker />}
        />
        <TouchableOpacity style={styles.torchButton} onPress={this.toggleTorch}>
          <Image
            source={isTorchOn ? assets.torchOn : assets.torchOff}
            style={styles.torchIcon}
          />
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
// <Barcode value={barcode} format="EAN13" flat />

export default QRCode;
