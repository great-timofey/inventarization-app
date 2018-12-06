// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';

export default StyleSheet.create({
  buttonHeader: {
    marginTop: 17,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 7,
    marginHorizontal: 30,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
    borderColor: colors.header.bluebuttonText,
  },
  inactiveHeaderBtn: {
    borderColor: colors.black,
    backgroundColor: colors.black,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: fonts.proDisplay.regular,
    color: colors.header.bluebuttonText,
  },
  inactiveHeaderBtnText: {
    color: colors.header.grayButtonText,
  },
});
