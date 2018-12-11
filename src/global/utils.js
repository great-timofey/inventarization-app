// @flow
import constants from 'global/constants';
import { Platform } from 'react-native';
import { deviceWidth } from 'global/device';

export const getPlaceholder = (size: number) =>
  `https://via.placeholder.com/${size}x${size}`;

export const platformSelect = (ios?: Object, android?: Object) =>
  Platform.select({ ios, android });

const isEmpty = (value: string) => value === '';

const isValid = (value: string, reg: RegExp) => {
  if (!value) {
    return false;
  }
  if (reg && reg.test(value)) {
    return true;
  }
  return false;
};

const isValidPassword = (password: string, confirmPassword: string) => {
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

const designWidth = 375;
export const scale = deviceWidth / designWidth;
export const normalize = (value: any) => value * scale;
export const normalizeInt = (value: any) => Math.round(value * scale);

export default {
  isEmpty,
  isValid,
  getPlaceholder,
  platformSelect,
  isValidPassword,
};
