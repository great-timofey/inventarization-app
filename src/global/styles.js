import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';

const Styles = StyleSheet.create({
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
    height: normalize(60),
    borderBottomWidth: 0,
    backgroundColor: colors.backGroundBlack,
  },
  authHeaderStyleBig: {
    height: normalize(90),
    borderBottomWidth: 0,
    backgroundColor: colors.backGroundBlack,
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

export default Styles;
