// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize, isSmallDevice } from '~/global/utils';

export default StyleSheet.create({
  customCancelDateTimePickerButton: {
    justifyContent: 'center',
    backgroundColor: colors.cancel,
    height: isSmallDevice ? normalize(68) : normalize(58),
    borderRadius: isSmallDevice ? normalize(10) : normalize(7),
  },
  customCancelDateTimePickerText: {
    padding: 10,
    textAlign: 'center',
    color: colors.white,
    fontSize: normalize(18),
    backgroundColor: 'transparent',
    fontFamily: fonts.proDisplay.light,
  },
  dateTimePickerConfirmText: {
    color: colors.black,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.bold,
  },
});
