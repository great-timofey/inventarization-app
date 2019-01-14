// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import { isIphoneX } from '~/global/device';

export default StyleSheet.create({
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backGroundBlack,
  },
  bigLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: normalize(50),
  },
  logoImage: {
    width: normalize(82),
    height: normalize(92),
    marginBottom: normalize(25),
  },
  bigLogoImage: {
    width: normalize(152),
    height: normalize(171),
  },
  logoText: {
    width: normalize(167),
    height: normalize(35),
    marginBottom: isIphoneX ? normalize(100) : normalize(48),
  },
});
