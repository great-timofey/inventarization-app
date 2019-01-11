// @flow

import type { SectionBase } from 'react-native/Libraries/Lists/SectionList';

export type Props = {
  role: string,
  userId: string,
  currentUser: ?Object,
  navigation: Object,
  userCompany: Object,
  currentUserId: string,
  createAsset: Function,
  updateAsset: Function,
  destroyAsset: Function,
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
  id: ?string,
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
  isDelModalOpened: boolean,
  guaranteeExpires: ?string,
  onTheBalanceSheet: string,
  activePreviewIndex: number,
  photosOfDamages: Array<Photo>,
  currentlyEditableField: ?string,
  isDateTimePickerOpened: boolean,
};
