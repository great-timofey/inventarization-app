// @flow

import { Platform } from 'react-native';

import { all, pickBy, keys, equals, values } from 'ramda';
// $FlowFixMe
import Permissions from 'react-native-permissions';

import constants from '~/global/constants';
import { deviceWidth, deviceHeight } from '~/global/device';

export const getPlaceholder = (size: number) => `https://via.placeholder.com/${size}x${size}`;

export const platformSelect = (ios?: Object, android?: Object) => Platform.select({ ios, android });

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
  const isPasswordValid = password && isValid(password, constants.regExp.password);
  const isConfirmPasswordValid = password && isValid(confirmPassword, constants.regExp.password);
  if (isPasswordValid && isConfirmPasswordValid && password === confirmPassword) {
    return true;
  }
  return false;
};

export const checkPermissions = (permissions: Object) => all(equals('authorized'), values(permissions));

export const askPermissions = async (permissionsToCheck: Object) => {
  const notGrantedKeys = keys(pickBy(val => val !== 'authorized', permissionsToCheck));
  const promises = notGrantedKeys.map(
    item => new Promise(res => res({ key: item, value: Permissions.request(item) })),
  );
  const userPermissions = await Promise.all(promises);
  console.log(userPermissions);
  return userPermissions;
};

export const designWidth = 375;
export const designHeight = 667;

export const scale = deviceWidth / designWidth;
export const isSmallDevice = deviceHeight < designHeight;
export const normalize = (value: number) => parseInt(value * scale, 10);
export const normalizeInt = (value: number) => Math.round(value * scale);

export default {
  isValid,
  normalize,
  normalizeInt,
  isSmallDevice,
  askPermissions,
  getPlaceholder,
  platformSelect,
  isValidPassword,
  checkPermissions,
};
