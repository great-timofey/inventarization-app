// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 7,
    height: normalize(52),
    paddingTop: normalize(8),
    marginBottom: normalize(10),
    paddingHorizontal: normalize(20),
    borderColor: colors.black,
    backgroundColor: colors.black,
  },
  invalidContainer: {
    borderColor: colors.invalidBorder,
  },
  inputTitleText: {
    textAlign: 'justify',
    fontSize: normalize(13),
    lineHeight: normalize(15),
    color: colors.text.inputTitle,
    fontFamily: fonts.proDisplay.light,
  },
  input: {
    width: '100%',
    color: colors.white,
    textAlign: 'justify',
    fontSize: normalize(18),
    lineHeight: normalize(21),
    fontFamily: fonts.proDisplay.light,
  },
});
