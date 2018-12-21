// @flow

export type Props = {
  navigation: Object,
};

type Photo = {
  uri: string,
  base64: string,
};

export type PhotosProps = {
  item: Photo,
  index: number,
};

export type Section = {
  title: string,
  index: number,
  data: Array<string>,
};

export type State = {
  purchaseDate?: Date,
  estimateDate?: Date,
  warrantyDate?: Date,
  showPhotos: boolean,
  photos: Array<Photo>,
  defects: Array<Photo>,
  isModalOpened: boolean,
  sections: Array<Section>,
  activePreviewIndex: number,
  isDatepickerOpened: boolean,
};
