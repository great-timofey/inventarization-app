// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';

export default StyleSheet.create({
  buttonHeader: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginHorizontal: 30,
    borderColor: colors.header.bluebuttonText,
  },
  inactiveHeaderBtn: {
    borderColor: colors.black,
    backgroundColor: colors.black,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.header.bluebuttonText,
  },
  inactiveHeaderBtnText: {
    color: colors.header.grayButtonText,
  },
});
