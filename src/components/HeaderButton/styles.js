// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  buttonHeader: {
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: normalize(20),
    marginBottom: normalize(10),
    paddingVertical: normalize(7),
    backgroundColor: colors.white,
    marginHorizontal: normalize(30),
    paddingHorizontal: normalize(14),
  },
  inactiveHeaderBtn: {
    borderWidth: 1,
    borderColor: colors.buttonBlue,
    backgroundColor: colors.black,
  },
  buttonText: {
    fontSize: normalize(14),
    lineHeight: normalize(16),
    fontFamily: fonts.proDisplay.regular,
    color: colors.black,
  },
  inactiveHeaderBtnText: {
    color: colors.header.bluebuttonText,
  },
});
