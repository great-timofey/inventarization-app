// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';

export default StyleSheet.create({
  container: {
    height: 52,
    width: '100%',
    backgroundColor: colors.black,
    paddingTop: 8,
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderColor: colors.black,
  },
  invalidContainer: {
    height: 52,
    width: '100%',
    backgroundColor: colors.black,
    paddingTop: 8,
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderColor: colors.invalidBorder,
  },
  inputTitleText: {
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'justify',
    color: colors.text.inputTitle,
    fontFamily: fonts.proDisplay.light,
  },
  input: {
    width: '100%',
    fontSize: 18,
    lineHeight: 21,
    color: colors.white,
    textAlign: 'justify',
    fontFamily: fonts.proDisplay.light,
  },
});
