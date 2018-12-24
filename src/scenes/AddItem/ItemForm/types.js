// @flow

export type Props = {
  navigation: Object,
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
  name: string,
  location: ?string,
  category: ?string,
  warnings: Object,
  coordinates: string,
  showPhotos: boolean,
  responsible: ?string,
  marketPrice: string,
  purchaseDate: ?string,
  estimateDate: ?string,
  photos: Array<Photo>,
  defects: Array<Photo>,
  inventoryCode: string,
  purchasePrice: string,
  isModalOpened: boolean,
  warrantyPeriod: ?string,
  sections: Array<Section>,
  activePreviewIndex: number,
  isDateTimePickerOpened: boolean,
  currentlyEditableDate: ?string,
};
