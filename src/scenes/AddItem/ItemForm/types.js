// @flow

export type Props = {
  navigation: Object,
  userCompany: Object,
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
  key: string,
  description: string,
  placeholder: string,
};

export type Section = {
  title: string,
  index: number,
  data: Array<string>,
};

export type State = {
  gps: ?Object,
  name: ?string,
  status: string,
  placeId: ?string,
  warnings: Object,
  location: ?string,
  codeData: ?string,
  category: ?string,
  assessedDate: ?Date,
  showPhotos: boolean,
  inventoryId: ?string,
  manufacture: ?string,
  photos: Array<Photo>,
  isModalOpened: boolean,
  assessedValue: ?string,
  purchasePrice: ?string,
  responsibleId: ?string,
  dateOfPurchase: ?string,
  sections: Array<Section>,
  guaranteeExpires: ?string,
  onTheBalanceSheet: string,
  activePreviewIndex: number,
  photosOfDamages: Array<Photo>,
  currentlyEditableField: ?string,
  isDateTimePickerOpened: boolean,
};
