// @flow

import React, { PureComponent, Fragment } from 'react';
import { View, Text, ActivityIndicator, Image, StatusBar, TouchableOpacity } from 'react-native';

import { assoc } from 'ramda';
//  $FlowFixMe
import Torch from 'react-native-torch';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { withApollo, compose, graphql } from 'react-apollo';

import ScannerMarker from '~/components/ScannerMarker';

import { isAndroid, isIOS } from '~/global/device';
import { GET_CURRENT_USER_COMPANY_CLIENT } from '~/graphql/auth/queries';
import colors from '~/global/colors';
import assets from '~/global/assets';
import constants from '~/global/constants';
import * as ASSETS_QUERIES from '~/graphql/assets/queries';
import * as SCENE_NAMES from '~/navigation/scenes';

import type { Props, State } from './types';
import styles from './styles';

const HeaderBackButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={assets.headerBackArrow} style={styles.backButton} />
  </TouchableOpacity>
);

const HeaderSkipButton = ({ onPress }: { onPress: Function }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.skipButtonText}>{constants.buttonTitles.skip}</Text>
  </TouchableOpacity>
);

class QRCode extends PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: Props) => {
    const checkMode = navigation.state.params && navigation.state.params.checkMode;
    const handleGoBack = navigation.state.params && navigation.state.params.handleGoBack;
    const handleGoFurther = navigation.state.params && navigation.state.params.handleGoFurther;
    return {
      title: constants.headers.qrscanner,
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: styles.header,
      headerLeft: (
        <HeaderBackButton onPress={handleGoBack} />
      ),
      headerRight: checkMode ? null : (
        <HeaderSkipButton onPress={handleGoFurther} />
      ),
    };
  };

  state = {
    isTorchOn: true,
    showScanner: isIOS,
    showNoMatchError: false,
  };

  navListener: any;
  navListenerBlurAndroid: any;
  navListenerFocusAndroid: any;

  componentDidMount() {
    const { navigation } = this.props;
    this.navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(colors.black);
    });
    if (isAndroid) {
      this.navListenerFocusAndroid = navigation.addListener('willFocus', () => this.setState({ showScanner: true }));
      this.navListenerBlurAndroid = navigation.addListener('didBlur', () => this.setState({ showScanner: false }));
    }
    //  eslint-disable-next-line max-len
    navigation.setParams({ handleGoBack: this.handleGoBack, handleGoFurther: this.handleGoFurther });
  }

  componentWillUnmount() {
    this.navListener.remove();
    if (isAndroid) {
      this.navListenerFocusAndroid.remove();
      this.navListenerBlurAndroid.remove();
    }
  }

  handleGoBack = () => {
    const { navigation } = this.props;
    navigation.navigate(SCENE_NAMES.ItemsSceneName);
  };

  handleGoFurther = () => {
    const { navigation } = this.props;
    navigation.navigate(SCENE_NAMES.AddItemPhotosSceneName);
  };

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
      props: { navigation },
      state: { isTorchOn, showNoMatchError, showScanner },
    } = this;
    const checkMode = navigation.getParam('checkMode', false);
    return (
      <View style={styles.container}>
        {showScanner && (
          <Fragment>
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
              <Image
                source={isTorchOn ? assets.torchOn : assets.torchOff}
                style={styles.torchIcon}
              />
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
          </Fragment>
        )}
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </View>
    );
  }
}

export default compose(
  graphql(GET_CURRENT_USER_COMPANY_CLIENT),
  withApollo,
)(QRCode);
