// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderRadius: 7,
    height: normalize(315),
    marginBottom: normalize(15),
    backgroundColor: colors.white,
  },
  modalCancel: {
    alignItems: 'center',
    height: normalize(54),
    justifyContent: 'center',
    borderRadius: normalize(7),
    backgroundColor: colors.cancel,
  },
  modalCancelText: {
    color: colors.white,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
  modalItem: {
    paddingLeft: 20,
    height: normalize(54),
    justifyContent: 'center',
  },
  modalItemText: {
    color: colors.black,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.light,
  },
  modalSeparator: {
    height: 1,
    backgroundColor: colors.gray,
  },
});
