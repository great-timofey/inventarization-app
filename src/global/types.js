// @flow

export type {
  KeyboardType,
} from 'react-native/Libraries/Components/TextInput/TextInput';
export type {
  ReturnKeyType,
} from 'react-native/Libraries/Components/TextInput/TextInput';

export type Photo = {
  base64: string,
  location: {
    lat: string,
    lon: string,
  },
  uri: string,
};

export type Item = {
  id: string | number,
  name: string,
  purchasePrice?: number,
  photos?: Array<any>,
}
