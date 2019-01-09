// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  container: {
    paddingTop: normalize(40),
    backgroundColor: colors.blue,
  },
  contentContainer: {
    paddingTop: normalize(30),
    paddingBottom: normalize(60),
  },
  editButton: {
    borderWidth: 1,
    borderRadius: 16,
    alignSelf: 'center',
    alignItems: 'center',
    height: normalize(28),
    width: normalize(190),
    justifyContent: 'center',
    marginTop: normalize(20),
    borderColor: colors.white,
    backgroundColor: colors.transparent,
  },
  editButtonText: {
    color: colors.white,
    fontSize: normalize(14),
    fontFamily: fonts.proDisplay.light,
  },
});
