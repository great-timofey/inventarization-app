// @flow

import { StyleSheet } from 'react-native';

import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import colors from '~/global/colors';

export default StyleSheet.create({
  container: {
    paddingTop: normalize(15),
  },
  addButtonContainer: {
    marginTop: normalize(20),
    marginLeft: normalize(75),
    marginBottom: normalize(30),
  },
  addButtonText: {
    color: colors.blue,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
  header: {
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
  headerStyle: {
    borderBottomWidth: 0,
  },
});
