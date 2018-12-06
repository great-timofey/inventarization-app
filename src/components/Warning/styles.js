// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { deviceWidth } from 'global/device';

export default StyleSheet.create({
  visibleContainer: {
    bottom: 0,
    height: 56,
    width: deviceWidth,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  hiddenContainer: {
    display: 'none',
  },
  errorText: {
    textAlign: 'center',
    color: colors.invalidBorder,
    fontFamily: fonts.proDisplay.light,
  },
});
