// @flow

import type { SectionBase } from 'react-native/Libraries/Lists/SectionList';

export type Props = {
  role: string,
  userId: string,
  client: Object,
  navigation: Object,
  userCompany: Object,
  currentUser: ?Object,
  currentUserId: string,
  createAsset: Function,
  updateAsset: Function,
  destroyAsset: Function,
  createdAssetsCount: number,
  addPhotosToAsset: Function,
  removeAssetPhotos: Function,
};

export type PhotosProps = {
  item: string,
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
  currentlyEditableField: ?string,
  isDateTimePickerOpened: boolean,
  photosUrls: Array<string>,
  photosToAdd: Array<string>,
  photosIdsToRemove: Array<string>,
  photosOfDamagesUrls: Array<string>,
  photosOfDamagesToAdd: Array<string>,
};
