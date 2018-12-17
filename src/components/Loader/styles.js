// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { deviceHeight, deviceWidth } from '~/global/device';

export default StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});
