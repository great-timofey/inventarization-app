// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  container: {
    borderRadius: 50,
    alignItems: 'center',
    width: normalize(55),
    height: normalize(55),
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  wrapper: {
    padding: 0,
    width: '100%',
    height: '100%',
  },
});
