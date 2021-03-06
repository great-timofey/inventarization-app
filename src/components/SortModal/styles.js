// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { isAndroid } from '~/global/device';

export default StyleSheet.create({
  modal: {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    paddingRight: normalize(30),
    paddingBottom: normalize(90),
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: normalize(10),
    justifyContent: 'flex-end',
  },
  text: {
    color: colors.white,
    fontSize: normalize(18),
    lineHeight: normalize(21),
    marginRight: normalize(20),
    fontFamily: fonts.proDisplay.light,
  },
  middleButton: {
    top: isAndroid ? normalize(4) : normalize(-4),
    left: isAndroid ? normalize(-8) : normalize(-6),
  },
  bottomButton: {
    top: isAndroid ? normalize(0) : normalize(2),
  },
  bottomButtonContainer: {
    backgroundColor: colors.white,
  },
});
