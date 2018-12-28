import { Dimensions, Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const { width: deviceWidth, height: deviceHeight } = Dimensions.get(
  'window',
);
export const isIphoneX = Platform.OS === 'ios' && (deviceWidth === 812 || deviceHeight === 812);

export default {
  isIOS,
  isIphoneX,
  isAndroid,
  deviceWidth,
  deviceHeight,
};
