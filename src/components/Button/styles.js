// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    height: normalize(54),
    justifyContent: 'center',
    borderRadius: normalize(7),
    backgroundColor: colors.buttonBlue,
  },
  disable: {
    backgroundColor: colors.buttonGray,
  },
  green: {
    backgroundColor: colors.buttonGreen,
  },
  titleText: {
    color: colors.white,
    fontSize: normalize(18),
    lineHeight: normalize(21),
    fontFamily: fonts.proDisplay.light,
  },
  titleTextDisable: {
    color: colors.white,
  },
});
