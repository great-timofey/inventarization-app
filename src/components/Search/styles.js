// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  blurContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  searchResultContainer: {
    borderBottomWidth: 1,
    height: normalize(49),
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: normalize(20),
    borderBottomColor: colors.blackOpacityLight,
  },
  searchResultText: {
    color: colors.black,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.light,
  },
  errorText: {
    color: colors.black,
    textAlign: 'center',
    fontSize: normalize(18),
    marginTop: normalize(100),
    fontFamily: fonts.proDisplay.light,
  },
});
