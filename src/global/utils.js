// @flow

import R from 'ramda';

import { Platform } from 'react-native';
import constants from 'global/constants';
import { deviceWidth } from 'global/device';

export const getPlaceholder = (size: number) =>
  `https://via.placeholder.com/${size}x${size}`;

export const platformSelect = (ios?: Object, android?: Object) =>
  Platform.select({ ios, android });

export const isEmpty = (value: string) => R.isEmpty(R.trim(value));

export const isValid = (value: string, reg: RegExp) => {
  if (isEmpty(value)) {
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

const designWidth = 375;
export const scale = deviceWidth / designWidth;
export const normalize = (value: any) => value * scale;
export const normalizeInt = (value: any) => Math.round(value * scale);

export default {
  isEmpty,
  isValid,
  normalize,
  normalizeInt,
  getPlaceholder,
  platformSelect,
  isValidPassword,
};
