// @flow

export type { KeyboardType } from 'react-native/Libraries/Components/TextInput/TextInput';
export type { ReturnKeyType } from 'react-native/Libraries/Components/TextInput/TextInput';

export type Photo = {
  base64: string,
  location: {
    lat: string,
    lon: string,
  },
  uri: string,
};

export type Item = {
  name: string,
  place?: {
    id: string,
  },
  responsible?: {
    id: string,
  },
  status: string,
  creator: ?Object,
  photos?: Array<any>,
  id: string | number,
  purchasePrice?: number,
};
