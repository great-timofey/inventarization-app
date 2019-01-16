// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { isAndroid } from '~/global/device';

export default StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row',
    height: normalize(54),
    borderColor: colors.black,
    borderRadius: normalize(7),
    marginBottom: normalize(10),
    backgroundColor: colors.black,
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
  },
  transparentBackgroundContainer: {
    borderWidth: 0,
    backgroundColor: colors.transparent,
  },
  whiteContainer: {
    borderColor: colors.input.whiteBG,
    backgroundColor: colors.input.whiteBG,
  },
  withButton: {
    paddingRight: 0,
  },
  invalidContainer: {
    backgroundColor: colors.invalidInputContainer,
  },
  invalidWhiteContainer: {
    backgroundColor: colors.invalidInputWhiteContainer,
  },
  inputTitleText: {
    zIndex: 2,
    top: normalize(5),
    position: 'absolute',
    fontSize: normalize(13),
    lineHeight: normalize(15),
    color: colors.text.inputTitle,
    fontFamily: fonts.proDisplay.light,
    left: isAndroid ? normalize(22) : normalize(20),
  },
  inputTitleTextWhite: {
    color: colors.input.whiteTitle,
    fontFamily: fonts.proDisplay.light,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: normalize(18),
    lineHeight: normalize(21),
    fontFamily: fonts.proDisplay.light,
    paddingTop: isAndroid ? normalize(20) : normalize(10),
  },
  inputWhite: {
    color: colors.black,
  },
  overflowView: {
    width: '100%',
    height: normalize(54),
    marginBottom: normalize(10),
  },
  multilineInput: {
    paddingTop: normalize(18),
    paddingBottom: normalize(10),
  },
  multilineContainer: {
    height: 'auto',
    minHeight: normalize(54),
  },
  itemFormErrorContainer: {
    backgroundColor: colors.itemFormErrorContainer,
  },
  inputErrorText: {
    color: colors.red,
  },
});
