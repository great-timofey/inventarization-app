// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { deviceWidth } from '~/global/device';

export default StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: 'row',
    height: normalize(54),
    borderColor: colors.black,
    marginBottom: normalize(10),
    backgroundColor: colors.black,
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
  },
  whiteContainer: {
    borderColor: colors.input.whiteBG,
    backgroundColor: colors.input.whiteBG,
  },
  withButton: {
    paddingRight: 0,
  },
  invalidContainer: {
    borderColor: colors.invalidBorder,
  },
  inputTitleText: {
    zIndex: 2,
    top: normalize(5),
    left: normalize(20),
    position: 'absolute',
    fontSize: normalize(13),
    lineHeight: normalize(15),
    color: colors.text.inputTitle,
    fontFamily: fonts.proDisplay.light,
  },
  inputTitleTextWhite: {
    color: colors.input.whiteTitle,
    fontFamily: fonts.proDisplay.light,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: normalize(18),
    paddingTop: normalize(10),
    lineHeight: normalize(21),
    fontFamily: fonts.proDisplay.light,
  },
  inputWhite: {
    color: colors.black,
  },
  overflowView: {
    width: deviceWidth,
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
});
