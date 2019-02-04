// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { deviceWidth } from '~/global/device';

export default StyleSheet.create({
  container: {
    top: 60,
    left: 25,
    zIndex: 4,
    position: 'absolute',
    borderRadius: normalize(7),
    backgroundColor: colors.white,
    width: deviceWidth - normalize(50),
  },
  employee: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(54),
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    backgroundColor: colors.input.whiteBG,
  },
  first: {
    borderTopLeftRadius: normalize(7),
    borderTopRightRadius: normalize(7),
  },
  last: {
    borderBottomLeftRadius: normalize(7),
    borderBottomRightRadius: normalize(7),
  },
  one: {
    borderRadius: normalize(7),
  },
  topText: {
    fontSize: normalize(13),
    color: colors.input.whiteTitle,
    fontFamily: fonts.proDisplay.regular,
  },
  botText: {
    color: colors.black,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
  button: {
    color: colors.accent,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
});
