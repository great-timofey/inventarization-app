// @flow

import { Platform } from 'react-native';

// $FlowFixMe
import ImageResizer from 'react-native-image-resizer';
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

export const convertToApolloUpload = async (photos: Array<any>, typeSeparator: string) => {
  const photosPromises = photos.map(({ uri }) => {
    const type = uri.slice(uri.lastIndexOf(typeSeparator) + 1).toUpperCase();
    return ImageResizer.createResizedImage(
      uri,
      constants.uploadCreateAssetImages.width,
      constants.uploadCreateAssetImages.height,
      type === 'JPG' ? 'JPEG' : type,
      constants.uploadCreateAssetImages.quality,
    ).then((photoPromise) => {
      const file = new ReactNativeFile({
        uri: photoPromise.uri.replace('file://', ''),
        name: `${photoPromise.uri.slice(-10)}`,
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
  getPlaceholder,
  platformSelect,
  isValidPassword,
  convertToApolloUpload,
};
