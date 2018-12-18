//  @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { deviceHeight, deviceWidth, isIphoneX } from '~/global/device';

export default StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    marginHorizontal: normalize(15),
  },
  headerTitleStyle: {
    marginHorizontal: 0,
    color: colors.black,
    fontWeight: 'normal',
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.medium,
  },
  backButton: {
    width: 28,
    height: 20,
    tintColor: colors.accent,
  },
  container: {
    flex: 1,
  },
  preview: {
    width: deviceWidth,
    height: deviceWidth,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: colors.buttonChooseLogo,
  },
  previewModeButtons: {
    top: normalize(20),
    left: normalize(20),
    position: 'absolute',
    flexDirection: 'row',
  },
  previewModeButton: {
    marginRight: 10,
    borderRadius: 22,
    alignItems: 'center',
    height: normalize(30),
    width: normalize(115),
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  previewModeButtonActive: {
    marginRight: 10,
    borderRadius: 22,
    alignItems: 'center',
    height: normalize(30),
    width: normalize(115),
    justifyContent: 'center',
    backgroundColor: colors.buttonBlue,
  },
  previewModeText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fonts.proDisplay.light,
  },
  previewModeTextActive: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.proDisplay.light,
  },
  previewText: {
    fontSize: 18,
    color: colors.text.darkGrey,
    fontFamily: fonts.proDisplay.regular,
  },
});
