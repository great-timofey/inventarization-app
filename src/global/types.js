// @flow

export type { KeyboardType } from 'react-native/Libraries/Components/TextInput/TextInput';
export type { ReturnKeyType } from 'react-native/Libraries/Components/TextInput/TextInput';

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
  id: string | number,
  purchasePrice?: number,
  photos?: Array<string>,
  photosUrls: Array<string>,
  photosOfDamagesUrls: Array<string>,
};
