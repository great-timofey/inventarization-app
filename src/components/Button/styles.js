// @flow

import { StyleSheet } from 'react-native';

import { fonts } from 'global/styles';
import colors from 'global/colors';

export default StyleSheet.create({
  container: {
    height: 54,
    marginTop: 15,
    width: '100%',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonBlue,
  },
  disable: {
    backgroundColor: colors.buttonGray,
  },
  green: {
    backgroundColor: colors.buttonGreen,
  },
  titleText: {
    fontSize: 18,
    lineHeight: 21,
    color: colors.white,
    fontFamily: fonts.proDisplay.light,
  },
  titleTextDisable: {
    color: colors.text.bigGray,
  },
});
