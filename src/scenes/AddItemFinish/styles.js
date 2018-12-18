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
    color: colors.green,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.medium,
  },
  backButton: {
    width: 28,
    height: 20,
    tintColor: colors.white,
  },
  preview: {
    flex: 1,
  },
  skipButtonText: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.proDisplay.medium,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.black,
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
