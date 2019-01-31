const API_KEY = 'AIzaSyBgbux6ZOjASHM8YI028IEHvnDXqd_BXe0';

//  eslint-disable-next-line no-undef
export const getReverseGeocoding = (lat: number, lon: number) => new Promise((res, rej) => fetch(
  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&language=ru&result_type=street_address&key=${API_KEY}`,
)
  .then(response => res(response))
  .catch(err => rej(err)));

//  eslint-disable-next-line no-undef
export const getGeocoding = (address: string) => new Promise((res, rej) => fetch(
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&language=ru&key=${API_KEY}`,
)
  .then(response => res(response))
  .catch(err => rej(err)));

export default {
  getGeocoding,
  getReverseGeocoding,
};
