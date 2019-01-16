// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  headerTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'center',
    paddingTop: normalize(30),
    backgroundColor: colors.white,
  },
  headerTitleText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: normalize(22),
    fontFamily: fonts.proDisplay.light,
  },
});
