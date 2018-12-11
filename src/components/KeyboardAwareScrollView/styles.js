// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: normalize(30),
    paddingHorizontal: normalize(30),
  },
  color: {
    backgroundColor: colors.backGroundBlack,
  },
});
