import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  logo: {
    width: 41,
    height: 36,
    resizeMode: 'contain',
  },
  iconStyle: {
    width: 28,
    height: 28,
    marginLeft: 10,
    marginRight: 0,
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
