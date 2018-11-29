// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 54,
    marginBottom: 10,
    backgroundColor: colors.black,
    borderRadius: 7,
    paddingTop: 8,
    paddingHorizontal: 20,
  },
  inputTitleText: {
    color: '#616161',
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
