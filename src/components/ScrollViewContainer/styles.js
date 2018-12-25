// @flow

import { StyleSheet } from 'react-native';

import { normalize } from '~/global/utils';
import colors from '~/global/colors';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  animatedContainer: {
    paddingHorizontal: normalize(30),
    backgroundColor: colors.backGroundBlack,
  },
});
