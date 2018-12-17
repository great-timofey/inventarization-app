// @flow

import { StyleSheet } from 'react-native';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  headerLeft: {
    alignSelf: 'flex-start',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(15),
  },
  arrowImage: {
    width: normalize(25),
    height: normalize(15),
  },
});
