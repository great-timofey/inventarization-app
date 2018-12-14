// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  visibleContainer: {
    width: '100%',
    paddingLeft: normalize(20),
    marginBottom: normalize(20),
    paddingRight: normalize(20),
  },
  hiddenContainer: {
    display: 'none',
  },
  errorText: {
    textAlign: 'left',
    fontSize: normalize(11),
    color: colors.invalidBorder,
    fontFamily: fonts.proDisplay.light,
  },
});
