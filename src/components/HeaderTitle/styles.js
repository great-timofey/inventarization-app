// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';

export default StyleSheet.create({
  headerTitle: {
    paddingTop: 30,
    alignSelf: 'flex-start',
  },
  headerTitleText: {
    fontSize: 22,
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.proDisplay.light,
  },
});
