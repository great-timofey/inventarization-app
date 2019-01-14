// @flow

import React, { PureComponent } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native';

import { assoc } from 'ramda';
//  $FlowFixMe
import Torch from 'react-native-torch';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { withApollo, compose, graphql } from 'react-apollo';

import ScannerMarker from '~/components/ScannerMarker';

import colors from '~/global/colors';
import assets from '~/global/assets';
import constants from '~/global/constants';
import * as ASSETS_QUERIES from '~/graphql/assets/queries';
import { GET_CURRENT_USER_COMPANY_CLIENT } from '~/graphql/auth/queries';
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
  static navigationOptions = ({ navigation }: Props) => {
    const checkMode = navigation.state.params && navigation.state.params.checkMode;
    return {
      title: constants.headers.qrscanner,
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: styles.header,
      headerLeft: (
        <HeaderBackButton onPress={() => navigation.navigate(SCENE_NAMES.ItemsSceneName)} />
      ),
      headerRight: checkMode ? null : (
        <HeaderSkipButton onPress={() => navigation.navigate(SCENE_NAMES.AddItemPhotosSceneName)} />
      ),
    };
  };

  state = {
    isTorchOn: true,
    showNoMatchError: false,
  };

  navListener: any;

  componentDidMount() {
    const { navigation } = this.props;
    this.navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  handleScan = async (event) => {
    try {
      const { data: currentCodeData } = event;
      const {
        client,
        data: {
          //  $FlowFixMe
          userCompany: {
            company: { id: companyId },
          },
        },
        navigation,
      } = this.props;

      const {
        data: { assets: dataAssets },
      } = await client.query({
        query: ASSETS_QUERIES.GET_COMPANY_ASSETS_DATA_CODES,
        variables: { companyId },
      });
      const match = dataAssets.find(({ codeData }) => codeData === currentCodeData);
      if (match) {
        const {
          data: {
            assets: [item],
          },
        } = await client.query({
          query: ASSETS_QUERIES.GET_COMPANY_ASSET_BY_ID,
          variables: { companyId, assetId: match.id },
        });
        navigation.navigate(SCENE_NAMES.ItemFormSceneName, { item });
      } else {
        const checkMode = navigation.getParam('checkMode', false);
        if (checkMode) {
          this.setState({ showNoMatchError: true });
        } else {
          navigation.navigate(SCENE_NAMES.AddItemPhotosSceneName, { codeData: currentCodeData });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  toggleTorch = () => {
    const { isTorchOn } = this.state;
    this.setState(state => assoc('isTorchOn', !state.isTorchOn, state));
    Torch.switchState(isTorchOn);
  };

  render() {
    const {
      state: { isTorchOn, showNoMatchError },
      props: { navigation },
    } = this;
    const checkMode = navigation.getParam('checkMode', false);
    return (
      <View style={styles.container}>
        <QRCodeScanner
          reactivate
          showMarker
          reactivateTimeout={1000}
          onRead={this.handleScan}
          cameraStyle={styles.scannerCameraStyle}
          customMarker={<ScannerMarker opacity={0.4} color={colors.black} />}
        />
        <TouchableOpacity
          style={[styles.torchButton, checkMode && styles.torchButtonCentered]}
          onPress={this.toggleTorch}
        >
          <Image source={isTorchOn ? assets.torchOn : assets.torchOff} style={styles.torchIcon} />
        </TouchableOpacity>
        {!checkMode && (
          <TouchableOpacity style={styles.makePhotoButton} disabled>
            <Image source={assets.logo} style={styles.makePhotoButtonImage} />
          </TouchableOpacity>
        )}
        <View style={styles.hintContainer}>
          <Text style={[styles.hintText, showNoMatchError && { color: 'red' }]}>
            {showNoMatchError ? constants.errors.qrcode : constants.text.qrhint}
          </Text>
        </View>
      </View>
    );
  }
}

export default compose(
  graphql(GET_CURRENT_USER_COMPANY_CLIENT),
  withApollo,
)(QRCode);
