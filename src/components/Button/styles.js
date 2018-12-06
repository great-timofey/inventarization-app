// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 54,
    backgroundColor: colors.buttonBlue,
    borderRadius: 7,
    marginTop: 15,
  },
  disable: {
    backgroundColor: colors.buttonGray,
  },
  green: {
    backgroundColor: colors.buttonGreen,
  },
  titleText: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 21,
  },
  titleTextDisable: {
    color: colors.text.bigGray,
  },
});
