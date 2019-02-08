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
    color: colors.green,
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
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.black,
    paddingBottom: isAndroid ? normalize(20) : 0,
  },
  preview: {
    zIndex: -10,
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    zIndex: -5,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  hint: {
    zIndex: 1,
    alignItems: 'center',
    position: 'absolute',
    width: normalize(114),
    height: normalize(114),
    justifyContent: 'center',
    borderRadius: normalize(57),
    top: deviceHeight / 2 - normalize(114),
    left: deviceWidth / 2 - normalize(114) / 2,
    backgroundColor: 'rgba(127, 127, 127, 0.6)',
  },
  checkImage: {
    width: normalize(54),
    height: normalize(54),
  },
  buttonContainer: {
    width: '90%',
    height: normalize(120),
    justifyContent: 'space-between',
    marginBottom: isIphoneX ? 0 : normalize(10),
  },
  button: {
    flex: 1,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButton: {
    marginBottom: normalize(10),
    backgroundColor: colors.buttonBlue,
  },
  bottomButton: {
    flexDirection: 'row',
    backgroundColor: colors.buttonGreen,
  },
  buttonText: {
    color: colors.white,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
  plus: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
});
