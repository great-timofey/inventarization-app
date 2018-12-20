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
    zIndex: 1,
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
    color: colors.black,
    fontSize: normalize(14),
    fontFamily: fonts.proDisplay.light,
  },
  previewModeTextActive: {
    color: colors.white,
    fontSize: normalize(14),
    fontFamily: fonts.proDisplay.light,
  },
  previewText: {
    fontSize: normalize(18),
    color: colors.text.darkGrey,
    fontFamily: fonts.proDisplay.regular,
  },
  previewInfo: {
    left: 20,
    bottom: 20,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(15),
    backgroundColor: colors.white,
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(13),
  },
  previewInfoText: {
    marginLeft: 5,
    color: colors.black,
    fontSize: normalize(14),
    fontFamily: fonts.proDisplay.regular,
  },
  photo: {
    width: deviceWidth,
    height: deviceWidth,
  },
  formContainer: {
    flex: 1,
  },
  formName: {
    paddingTop: normalize(20),
    paddingHorizontal: normalize(20),
  },
  formNameHint: {
    fontSize: normalize(13),
    fontFamily: fonts.proDisplay.light,
  },
  formNameInput: {
    fontSize: normalize(24),
    marginBottom: normalize(5),
    fontFamily: fonts.proDisplay.bold,
  },
  formSectionHeader: {
    width: '100%',
    height: normalize(28),
    justifyContent: 'center',
    paddingLeft: normalize(20),
    marginBottom: normalize(10),
  },
  formSectionHeaderText: {
    color: colors.white,
    fontSize: normalize(13),
    fontFamily: fonts.proDisplay.regular,
  },
  saveItem: {
    width: deviceWidth,
    alignItems: 'center',
    height: normalize(54),
    justifyContent: 'center',
    backgroundColor: colors.text.blue,
  },
  saveItemText: {
    color: colors.white,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
});
