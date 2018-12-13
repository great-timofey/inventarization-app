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
    backgroundColor: colors.black,
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
    justifyContent: 'flex-start',
  },
  makePhotoButton: {
    zIndex: 5,
    borderRadius: 33,
    position: 'absolute',
    alignItems: 'center',
    width: normalize(66),
    height: normalize(66),
    bottom: normalize(120),
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  makePhotoButtonImage: {
    width: 36,
    height: 41,
    opacity: 0.3,
    tintColor: colors.backGroundBlack,
  },
  torchButton: {
    zIndex: 5,
    left: 60,
    bottom: normalize(125),
    position: 'absolute',
  },
  torchIcon: {
    width: 50,
    height: 50,
  },
});
