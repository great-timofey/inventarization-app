//  @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    backgroundColor: colors.black,
    marginHorizontal: normalize(15),
  },
  headerTitleStyle: {
    color: colors.white,
    fontSize: normalize(18),
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
  torchIcon: {
    width: 50,
    height: 50,
  },
});
