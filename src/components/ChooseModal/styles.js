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
    justifyContent: 'center',
    marginBottom: normalize(15),
    backgroundColor: colors.white,
  },
  modalContainerWithoutData: {
    alignItems: 'center',
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
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(54),
    justifyContent: 'flex-start',
  },
  modalItemText: {
    color: colors.black,
    fontSize: normalize(18),
    marginLeft: normalize(15),
    fontFamily: fonts.proDisplay.light,
  },
  modalSeparator: {
    height: 1,
    backgroundColor: colors.gray,
  },
  categoryIcon: {
    marginLeft: 0,
    alignSelf: 'center',
  },
  getDownIcon: {
    right: 10,
    alignSelf: 'center',
    position: 'absolute',
  },
  drilledDownText: {
    marginLeft: normalize(40),
  },
  allCategoryText: {
    fontWeight: 'bold',
  },
  noItemsImage: {
    alignSelf: 'center',
    marginBottom: normalize(15),
  },
  noItemsText: {
    textAlign: 'center',
    fontSize: normalize(18),
    color: colors.modalHints,
    fontFamily: fonts.proDisplay.light,
  },
});
