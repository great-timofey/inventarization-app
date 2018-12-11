// @flow

import React, { PureComponent } from 'react';
import { Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import Barcode from 'react-native-barcode-builder';
import QRCodeScanner from 'react-native-qrcode-scanner';

import utils from 'global/utils';
import Styles from 'global/styles';
import constants from 'global/constants';
import * as SCENE_NAMES from 'navigation/scenes';
import * as MUTATIONS from 'graphql/auth/mutations';

import styles from './styles';
import type { Props, State } from './types';

class QRCode extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      barcode: '',
    };
  }

  render() {
    const { barcode } = this.state;
    return (
      <QRCodeScanner
        reactivate
        reactivateTimeout={1000}
        onRead={e => {
          console.log(e);
          console.log('base64 string:', btoa(e.data));
          this.setState({ barcode: e.data });
        }}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            {barcode.length === 0 ? (
              <ActivityIndicator />
            ) : (
              <Barcode value={barcode} format="EAN13" flat />
            )}
          </TouchableOpacity>
        }
      />
    );
  }
}

export default QRCode;
