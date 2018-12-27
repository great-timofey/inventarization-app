// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  modal: {
    justifyContent: 'center', alignItems: 'center',
  },
  container: {
    borderRadius: 15,
    width: normalize(315),
    minHeight: normalize(223),
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: normalize(315),
    justifyContent: 'space-between',
  },
  leftButton: {
    flex: 1,
    alignItems: 'center',
    height: normalize(60),
    justifyContent: 'center',
    borderBottomLeftRadius: 15,
    backgroundColor: colors.cancel,
  },
  buttonText: {
    color: colors.white,
    fontSize: normalize(18),
    lineHeight: normalize(21),
    fontFamily: fonts.proDisplay.regular,
  },
  rightButton: {
    flex: 1,
    alignItems: 'center',
    height: normalize(60),
    justifyContent: 'center',
    borderBottomRightRadius: 15,
    backgroundColor: colors.buttonBlue,
  },
  title: {
    textAlign: 'center',
    fontSize: normalize(22),
    marginTop: normalize(45),
    lineHeight: normalize(26),
    fontFamily: fonts.proDisplay.light,
    color: colors.header.createCompany,
  },
  question: {
    textAlign: 'center',
    color: colors.lightGray,
    fontSize: normalize(18),
    lineHeight: normalize(21),
    fontFamily: fonts.proDisplay.light,
  },
});
