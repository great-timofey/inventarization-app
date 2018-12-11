// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 1,
    borderRadius: 7,
    height: normalize(52),
    marginBottom: normalize(10),
    paddingHorizontal: normalize(20),
    borderColor: colors.black,
    backgroundColor: colors.black,
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
    top: normalize(5),
    left: normalize(20),
    zIndex: 2,
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
});
