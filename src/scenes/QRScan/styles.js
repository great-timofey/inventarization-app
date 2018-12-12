//  @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';
import { deviceWidth, deviceHeight } from 'global/device';

export default StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    marginHorizontal: 15,
    backgroundColor: colors.black,
  },
  headerTitleStyle: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.proDisplay.medium,
  },
  backButton: {
    width: 28,
    height: 20,
    tintColor: colors.white,
  },
  skipButtonText: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.proDisplay.medium,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: colors.green,
  },
  overlay: {
    top: 0,
    zIndex: 3,
    width: deviceWidth,
    borderTopWidth: 90,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    position: 'absolute',
    borderBottomWidth: 120,
    backgroundColor: 'transparent',
    borderColor: 'rgba(0, 0, 0, 0.3)',
    height: deviceHeight - normalize(165),
  },
  overlayInner: {
    zIndex: 2,
    borderRadius: 20,
    top: normalize(105),
    left: normalize(50),
    overflow: 'hidden',
    position: 'absolute',
    width: normalize(276),
    height: normalize(278),
    backgroundColor: 'red',
  },
  hintContainer: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    height: normalize(80),
    marginTop: normalize(20),
  },
  hintText: {
    fontSize: normalize(18),
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.proDisplay.regular,
  },
  scannerCameraStyle: {
    flex: 1,
    alignSelf: 'center',
  },
  makePhotoButton: {
    width: normalize(66),
    height: normalize(66),
    bottom: normalize(110),
    zIndex: 5,
    borderRadius: 33,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  makePhotoButtonImage: {
    width: 36,
    height: 41,
    opacity: 0.3,
    tintColor: colors.backGroundBlack,
  },
  flashButton: {
    zIndex: 5,
    left: 60,
    bottom: normalize(110),
    position: 'absolute',
  },
  flashIcon: {
    width: 50,
    height: 50,
    backgroundColor: colors.transparent,
  },
});
