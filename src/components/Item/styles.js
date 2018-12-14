// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  container: {
    width: normalize(158),
    height: normalize(218),
    marginBottom: normalize(5),
  },
  image: {
    borderRadius: 10,
    width: normalize(158),
    height: normalize(158),
    marginBottom: normalize(6),
    backgroundColor: colors.darkGreen,
  },
  title: {
    letterSpacing: -0.2,
    fontSize: normalize(16),
    fontFamily: fonts.proText.regular,
    marginBottom: normalize(3),
  },
  price: {
    color: '#BDBDBD',
    fontSize: normalize(15),
    fontFamily: fonts.proDisplay.medium,
  },
});
