// @flow

import { Platform } from 'react-native';
import constants from 'global/constants';
import { deviceWidth, deviceHeight } from 'global/device';

export const getPlaceholder = (size: number) =>
  `https://via.placeholder.com/${size}x${size}`;

export const platformSelect = (ios?: Object, android?: Object) =>
  Platform.select({ ios, android });

export const isValid = (value: string, reg: RegExp) => {
  if (!value.trim()) {
    return false;
  }
  if (reg && reg.test(value)) {
    return true;
  }
  return false;
};

export const isValidPassword = (password: string, confirmPassword: string) => {
  const isPasswordValid =
    password && isValid(password, constants.regExp.password);
  const isConfirmPasswordValid =
    password && isValid(confirmPassword, constants.regExp.password);
  if (
    isPasswordValid &&
    isConfirmPasswordValid &&
    password === confirmPassword
  ) {
    return true;
  }
  return false;
};

export const designWidth = 375;
export const designHeight = 667;

export const scale = deviceWidth / designWidth;
export const isSmallDevice = () => deviceHeight < designHeight;
export const normalize = (value: number) => parseInt(value * scale);
export const normalizeInt = (value: number) => Math.round(value * scale);

export default {
  isValid,
  normalize,
  normalizeInt,
  isSmallDevice,
  getPlaceholder,
  platformSelect,
  isValidPassword,
};
