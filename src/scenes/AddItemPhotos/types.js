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

export type State = {
  flashMode: number,
  photos: Array<Photo>,
  isHintOpened: boolean,
};
