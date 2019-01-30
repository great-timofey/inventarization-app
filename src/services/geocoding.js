import { isIOS } from '~/global/device';

const COMMON_KEY = 'AIzaSyCPcnDxT-TtMkc3rC0JS49nCIg-GnKiXmA';
const IOS_KEY = 'AIzaSyBAZ4myeDLpd-s6bMB7IvNbIkANw8ltugE';
const ANDROID_KEY = 'something';

const API_KEY = isIOS ? IOS_KEY : ANDROID_KEY;

export const getAddressByCoords = (lat, lon) =>
  new Promise((res, rej) => fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&language=ru&result_type=street_address&key=${COMMON_KEY}`)
    .then(response => res(response))
    .catch(err => rej(err)));

export default {
  getAddressByCoords,
};

