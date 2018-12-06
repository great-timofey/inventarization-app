// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { deviceWidth } from 'global/device';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  visibleContainer: {
    bottom: 0,
    width: deviceWidth,
    position: 'absolute',
    height: normalize(56),
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
