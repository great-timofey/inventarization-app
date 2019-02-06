// @flow

import { Platform } from 'react-native';

// $FlowFixMe
import ImageResizer from 'react-native-image-resizer';
//  $FlowFixMe
import { last, includes, memoizeWith, identity } from 'ramda';
import { ReactNativeFile } from 'apollo-upload-client';

import constants from '~/global/constants';
import { deviceWidth, deviceHeight, isAndroid } from '~/global/device';
import { getGeocoding, getReverseGeocoding } from '~/services/geocoding';

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

export const capitalize = (string: string) => string[0].toUpperCase().concat(string.slice(1));

export const convertToApolloUpload = async (photos: Array<Object>, typeSeparator: string) => {
  // console.log(1)
  const photosPromises = photos.map(({ uri }) => {
    const type = uri.slice(uri.lastIndexOf(typeSeparator) + 1).toUpperCase();
    // const alreadyUploaded = uri.startsWith('https');
    return ImageResizer.createResizedImage(
      uri,
      constants.uploadCreateAssetImages.width,
      constants.uploadCreateAssetImages.height,
      type === 'JPG' ? 'JPEG' : type,
      constants.uploadCreateAssetImages.quality,
    ).then((photoUrlPromise) => {
      console.log(photoUrlPromise);
      const file = new ReactNativeFile({
        name: photoUrlPromise.uri.slice(-10),
        uri: isAndroid ? photoUrlPromise.uri : photoUrlPromise.uri.replace('file://', ''),
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

export const getPrefix = (inputString: string) => {
  let prefix = '';
  const lastLetter = last(inputString);

  if (includes(lastLetter, constants.suffixes.firstType)) {
    prefix = constants.prefixes.firstType;
  } else if (includes(lastLetter, constants.suffixes.secondType)) {
    prefix = constants.prefixes.secondType;
  } else {
    prefix = constants.prefixes.thirdType;
  }

  return prefix;
};

export const getCurrentLocation = async () => {
  const params = isAndroid
    ? undefined
    : { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

  const locationPromise = new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lon } }) => {
        const coords = { lat, lon };
        res(coords);
      },
      error => rej(error.message),
      params,
    );
  });

  const location = await locationPromise;
  return location;
};

export const getCoordsByAddress = memoizeWith(identity, async (address: string) => {
  const { _bodyText } = await getGeocoding(address);
  const { status, results } = JSON.parse(_bodyText);
  if (status === constants.geocodingStatuses.ok) {
    const { lat: latitude, lng: longitude } = results[0].geometry.location;
    return { latitude, longitude };
  }
  return null;
});

export const getAddressByCoords = memoizeWith(identity, async (lat: number, lon: number) => {
  const { _bodyText } = await getReverseGeocoding(lat, lon);
  const { status, results } = JSON.parse(_bodyText);
  if (status === constants.geocodingStatuses.ok) {
    return results[0].formatted_address;
  }
  return null;
});

export const debounce = (fn: Function, time: number) => {
  let timeout;

  //  eslint-disable-next-line
  return function () {
    //  eslint-disable-next-line
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

export const designWidth = 375;
export const designHeight = 667;

export const scale = deviceWidth / designWidth;
export const isSmallDevice = deviceHeight < designHeight;
export const normalize = (value: number) => parseInt(value * scale, 10);
export const normalizeInt = (value: number) => Math.round(value * scale);

export default {
  isValid,
  debounce,
  normalize,
  getPrefix,
  capitalize,
  normalizeInt,
  isSmallDevice,
  getPlaceholder,
  platformSelect,
  isValidPassword,
  getCoordsByAddress,
  getAddressByCoords,
  getCurrentLocation,
  convertToApolloUpload,
};
