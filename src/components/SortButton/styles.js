// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    right: normalize(30),
    position: 'absolute',
    width: normalize(55),
    height: normalize(55),
    bottom: normalize(44),
    backgroundColor: colors.blue,
  },
  text: {
    color: colors.white,
    fontFamily: fonts.proDisplay.regular,
    fontSize: normalize(24),
    lineHeight: normalize(28),
    textAlign: 'left',
  },
});
