// @flow
import { Platform } from 'react-native';

export const getPlaceholder = (size: number) =>
  `https://via.placeholder.com/${size}x${size}`;

export const platformSelect = (ios?: Object, android?: Object) =>
  Platform.select({ ios, android });

const validateFunction = (regExp: RegExp, value: string) => {
  if (regExp.test(value)) {
    return true;
  }
  return false;
};

export default {
  getPlaceholder,
  platformSelect,
  validateFunction,
};
