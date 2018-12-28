// @flow

import type { SectionBase } from 'react-native/Libraries/Lists/SectionList';

export type Props = {
  userId: string,
  navigation: Object,
  userCompany: Object,
  currentUserId: string,
  createAsset: Function,
};

type Photo = {
  uri: string,
};

export type PhotosProps = {
  item: Photo,
  index: number,
};

export type PreviewProps = {
  item: {
    key: string,
    description: string,
    placeholder: any,
  },
};

export type Section = SectionBase<string> & { title: string, index: number };

export type State = {
  gps: ?Object,
  name: ?string,
  status: string,
  creator: ?Object,
  placeId: ?string,
  warnings: Object,
  location: ?string,
  codeData: ?string,
  category: ?string,
  isNewItem: boolean,
  assessedDate: ?Date,
  showPhotos: boolean,
  inventoryId: ?string,
  manufacture: ?string,
  photos: Array<Photo>,
  isModalOpened: boolean,
  assessedValue: ?string,
  purchasePrice: ?string,
  responsibleId: ?Object,
  dateOfPurchase: ?string,
  formIsEditable: boolean,
  showSaveButton: boolean,
  sections: Array<Section>,
  guaranteeExpires: ?string,
  onTheBalanceSheet: string,
  activePreviewIndex: number,
  photosOfDamages: Array<Photo>,
  currentlyEditableField: ?string,
  isDateTimePickerOpened: boolean,
};
