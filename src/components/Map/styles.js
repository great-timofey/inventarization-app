// @flow

import { StyleSheet } from 'react-native';

import { normalize } from '~/global/utils';
import { deviceWidth } from '~/global/device';

export default StyleSheet.create({
  map: {
    width: deviceWidth,
    height: normalize(463),
  },
});
