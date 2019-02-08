//  @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { deviceHeight, deviceWidth, isIphoneX, isAndroid } from '~/global/device';

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
    flex: 1,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: 0,
    color: colors.white,
    fontSize: normalize(18),
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontFamily: fonts.proDisplay.medium,
  },
  headerTitleSmallStyle: {
    color: colors.white,
    fontSize: normalize(16),
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
    flexDirection: 'column',
    backgroundColor: colors.black,
    paddingBottom: isAndroid ? normalize(20) : 0,
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
  activityIndicatorView: {
    zIndex: 3,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: colors.blackOpacityExtraLight,
    ...StyleSheet.absoluteFillObject,
  },
  hintText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: normalize(18),
    paddingHorizontal: normalize(10),
    fontFamily: fonts.proDisplay.light,
  },
  preview: {
    flex: 1,
  },
  bottomSection: {
    overflow: 'visible',
    height: normalize(96),
    paddingLeft: normalize(10),
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
