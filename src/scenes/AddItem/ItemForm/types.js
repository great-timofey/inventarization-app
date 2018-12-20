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
  showPhotos: boolean,
  photos: Array<Photo>,
  defects: Array<Photo>,
  sections: Array<Section>,
  activePreviewIndex: number,
};
