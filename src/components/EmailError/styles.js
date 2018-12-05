// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { deviceWidth } from 'global/device';

export default StyleSheet.create({
  errorContainer: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    backgroundColor: colors.black,
    height: 56,
    justifyContent: 'center',
  },
  errorText: {
    color: colors.invalidBorder,
    textAlign: 'center',
  },
});
