//  @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { isAndroid, isIphoneX } from '~/global/device';

export default StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    backgroundColor: colors.black,
    paddingTop: isAndroid ? 0 : normalize(17),
    borderTopWidth: isIphoneX ? normalize(15) : 0,
    marginHorizontal: isAndroid ? 0 : normalize(15),
    height: isAndroid ? normalize(45) : normalize(65),
  },
  headerTitleStyle: {
    color: colors.white,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.medium,
    marginLeft: isAndroid ? normalize(50) : 0,
  },
  backButton: {
    width: 28,
    height: 20,
    tintColor: colors.white,
    marginLeft: isAndroid ? normalize(25) : 0,
  },
  skipButtonText: {
    color: colors.white,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.medium,
    marginRight: isAndroid ? normalize(25) : 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: colors.black,
    paddingBottom: isAndroid ? normalize(20) : 0,
  },
  hintContainer: {
    height: normalize(80),
    marginTop: normalize(20),
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(30),
  },
  hintText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
  scannerCameraStyle: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  makePhotoButton: {
    zIndex: 2,
    position: 'absolute',
    alignItems: 'center',
    width: normalize(66),
    height: normalize(66),
    bottom: normalize(120),
    justifyContent: 'center',
    borderRadius: normalize(33),
    backgroundColor: colors.white,
  },
  makePhotoButtonImage: {
    opacity: 0.3,
    width: normalize(36),
    height: normalize(41),
    tintColor: colors.backGroundBlack,
  },
  torchButton: {
    zIndex: 2,
    left: normalize(60),
    position: 'absolute',
    bottom: normalize(125),
  },
  torchButtonCentered: {
    left: null,
  },
  torchIcon: {
    width: 50,
    height: 50,
  },
});
