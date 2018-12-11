// @flow

import React, { PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';

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
    this.state = {};
  }

  render() {
    return (
      <QRCodeScanner
        onRead={e => {
          console.log(e);
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
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

export default QRCode;
