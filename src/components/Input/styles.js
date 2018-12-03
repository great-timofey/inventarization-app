// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';

export default StyleSheet.create({
  container: {
    height: 54,
    width: '100%',
    backgroundColor: colors.black,
    paddingTop: 8,
    borderRadius: 7,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  inputTitleText: {
    color: colors.text.inputTitle,
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'justify',
  },
  notValide: {
    color: colors.red,
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'justify',
  },
  input: {
    width: '100%',
    color: colors.white,
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'justify',
  },
});
