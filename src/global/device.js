import { Dimensions, Platform } from 'react-native';

const PlatformOS = Platform.OS;
export const isIOS = PlatformOS === 'ios';
export const isAndroid = PlatformOS === 'android';
export const { width: deviceWidth, height: deviceHeight } = Dimensions.get(
  'window'
);
export const isIphoneX =
  Platform.OS === 'ios' && (deviceWidth === 812 || deviceHeight === 812);

export default {
  isIOS,
  isIphoneX,
  isAndroid,
  deviceWidth,
  deviceHeight,
};
