// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  container: {
    padding: 0,
    borderRadius: 50,
    alignItems: 'center',
    width: normalize(55),
    height: normalize(55),
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
});
