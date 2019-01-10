// @flow

import { StyleSheet } from 'react-native';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  headerLeft: {
    alignSelf: 'flex-start',
    paddingLeft: normalize(20),
  },
  arrowImage: {
    width: normalize(25),
    height: normalize(15),
  },
});
