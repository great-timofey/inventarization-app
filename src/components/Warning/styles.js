// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { deviceWidth } from 'global/device';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  visibleContainer: {
    width: deviceWidth,
    paddingLeft: normalize(50),
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
