// @flow

import { Platform } from 'react-native';

// $FlowFixMe
import ImageResizer from 'react-native-image-resizer';
import { last, includes } from 'ramda';
import { ReactNativeFile } from 'apollo-upload-client';

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

export const capitalize = (string: string) => string[0].toUpperCase().concat(string.slice(1))

export const convertToApolloUpload = async (photos: Array<Object>, typeSeparator: string) => {
  const photosPromises = photos.map(({ uri }) => {
    const type = uri.slice(uri.lastIndexOf(typeSeparator) + 1).toUpperCase();
    const alreadyUploaded = uri.startsWith('https');
    return ImageResizer.createResizedImage(
      uri,
      constants.uploadCreateAssetImages.width,
      constants.uploadCreateAssetImages.height,
      type === 'JPG' ? 'JPEG' : type,
      alreadyUploaded ? 1 : constants.uploadCreateAssetImages.quality,
    ).then((photoUrlPromise) => {
      const file = new ReactNativeFile({
        name: photoUrlPromise.uri.slice(-10),
        uri: photoUrlPromise.uri.replace('file://', ''),
        type: type === 'JPG' ? 'image/jpeg' : 'image/png',
      });
      return file;
    });
  });
  const result = await Promise.all(photosPromises);
  return result;
};

export const isValidPassword = (password: string, confirmPassword: string) => {
  const isPasswordValid = password && isValid(password, constants.regExp.password);
  const isConfirmPasswordValid = password && isValid(confirmPassword, constants.regExp.password);
  if (isPasswordValid && isConfirmPasswordValid && password === confirmPassword) {
    return true;
  }
  return false;
};

export const getPrefix = (string: string) => {
  let prefix = '';
  const lastLetter = last(string);

  if (includes(lastLetter, constants.suffixes.firstType)) {
    prefix = 'Вся';
  } else if (includes(lastLetter, constants.suffixes.secondType)) {
    prefix = 'Все';
  } else {
    prefix = 'Весь';
  }

  return prefix;
}

export const designWidth = 375;
export const designHeight = 667;

export const scale = deviceWidth / designWidth;
export const isSmallDevice = deviceHeight < designHeight;
export const normalize = (value: number) => parseInt(value * scale, 10);
export const normalizeInt = (value: number) => Math.round(value * scale);

export default {
  isValid,
  normalize,
  getPrefix,
  capitalize,
  normalizeInt,
  isSmallDevice,
  getPlaceholder,
  platformSelect,
  isValidPassword,
  convertToApolloUpload,
};
