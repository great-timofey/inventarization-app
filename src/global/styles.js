// @flow

import { StyleSheet } from 'react-native';

import colors from './colors';
import { deviceWidth, deviceHeight } from './device';
import { normalize } from './utils';

import type { Styles } from '~/types';

const containerBorderRadius = 20;
export const containerOffset = containerBorderRadius / 2;

export const stylesObject: Styles = {
  container: {
    position: 'absolute',
    top: -containerOffset,
    left: -containerOffset,
    width: deviceWidth + containerBorderRadius,
    height: deviceHeight + containerBorderRadius,
    backgroundColor: colors.white,
    borderRadius: containerBorderRadius,
  },
};

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  container: stylesObject.container,
  wrapper: {
    flex: 1,
    marginTop: containerBorderRadius,
    marginLeft: containerBorderRadius,
  },
  logo: {
    width: normalize(41),
    height: normalize(36),
    resizeMode: 'contain',
  },
  iconStyle: {
    width: normalize(28),
    height: normalize(28),
    marginLeft: normalize(10),
    marginRight: 0,
  },
  authHeaderStyle: {
    elevation: 0,
    height: normalize(60),
    borderBottomWidth: 0,
    backgroundColor: colors.backGroundBlack,
  },
  authHeaderStyleBig: {
    elevation: 0,
    borderBottomWidth: 0,
    height: normalize(90),
    backgroundColor: colors.backGroundBlack,
  },
  headerTitleStyle: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
});

const proText = 'SFProText';
const proDisplay = 'SFProDisplay';

export const fonts = {
  proDisplay: {
    bold: `${proDisplay}-Bold`,
    light: `${proDisplay}-Light`,
    medium: `${proDisplay}-Medium`,
    regular: `${proDisplay}-Regular`,
  },
  proText: {
    regular: `${proText}-Regular`,
    semibold: `${proText}-SemiBold`,
  },
};
