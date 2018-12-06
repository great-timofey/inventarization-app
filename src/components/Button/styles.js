// @flow

import { StyleSheet } from 'react-native';

import { fonts } from 'global/styles';
import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 7,
    alignItems: 'center',
    height: normalize(54),
    marginTop: normalize(15),
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
    color: colors.white,
    fontSize: normalize(18),
    lineHeight: normalize(21),
    fontFamily: fonts.proDisplay.light,
  },
  titleTextDisable: {
    color: colors.text.bigGray,
  },
});
