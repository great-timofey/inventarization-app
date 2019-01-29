// @flow

import { StyleSheet } from 'react-native';

import { normalize } from '~/global/utils';
import { deviceWidth, isIphoneX } from '~/global/device';

export default StyleSheet.create({
  map: {
    width: deviceWidth,
    height: isIphoneX ? normalize(585) : normalize(463),
  },
});
