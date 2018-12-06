// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  buttonHeader: {
    borderWidth: 1,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: normalize(17),
    paddingVertical: normalize(7),
    marginHorizontal: normalize(30),
    paddingHorizontal: normalize(14),
    borderColor: colors.header.bluebuttonText,
  },
  inactiveHeaderBtn: {
    borderColor: colors.black,
    backgroundColor: colors.black,
  },
  buttonText: {
    fontSize: normalize(14),
    lineHeight: normalize(16),
    fontFamily: fonts.proDisplay.regular,
    color: colors.header.bluebuttonText,
  },
  inactiveHeaderBtnText: {
    color: colors.header.grayButtonText,
  },
});
