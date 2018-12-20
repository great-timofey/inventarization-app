//  @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { deviceHeight, deviceWidth, isIphoneX } from '~/global/device';

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
    flexDirection: 'column',
    backgroundColor: colors.black,
  },
  hint: {
    zIndex: 2,
    borderRadius: 20,
    alignItems: 'center',
    position: 'absolute',
    width: normalize(242),
    height: normalize(114),
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    left: deviceWidth / 2 - normalize(242) / 2,
    top: deviceHeight / 2 - normalize(114) / 2 - normalize(80),
  },
  hintText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: normalize(18),
    paddingHorizontal: normalize(18),
    fontFamily: fonts.proDisplay.light,
  },
  preview: {
    flex: 1,
  },
  bottomSection: {
    overflow: 'visible',
    height: normalize(80),
    backgroundColor: colors.black,
  },
  makePhotoButton: {
    zIndex: 2,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    width: normalize(66),
    height: normalize(66),
    justifyContent: 'center',
    borderRadius: normalize(33),
    backgroundColor: colors.white,
    bottom: isIphoneX ? normalize(140) : normalize(120),
  },
  makePhotoButtonImage: {
    width: normalize(36),
    height: normalize(41),
  },
  flashButton: {
    zIndex: 2,
    left: normalize(60),
    position: 'absolute',
  },
  flashOn: {
    bottom: isIphoneX ? normalize(150) : normalize(130),
  },
  flashOff: {
    left: normalize(70),
    bottom: isIphoneX ? normalize(150) : normalize(130),
  },
  flashIconOn: {
    width: normalize(15),
    height: normalize(33),
  },
  flashIconOff: {
    width: normalize(33),
    height: normalize(33),
  },
  photoContainer: {
    width: normalize(76),
    height: normalize(76),
    marginLeft: normalize(10),
  },
  photoImage: {
    borderRadius: 15,
    position: 'relative',
    width: normalize(76),
    height: normalize(76),
  },
  removePhotoIcon: {
    zIndex: 1,
    top: normalize(-3),
    right: normalize(-3),
    position: 'absolute',
    width: normalize(26),
    height: normalize(26),
  },
  smallerIcon: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
  photosOuter: {
    overflow: 'visible',
  },
  photosInner: {
    alignItems: 'center',
  },
});
