// @flow

export type Props = {
  navigation: Object,
};

export type PhotosProps = {
  item: string,
  index: number,
};

export type State = {
  flashMode: number,
  showCamera: boolean,
  isLoading: boolean,
  photos: Array<string>,
  isHintOpened: boolean,
  ableToTakePicture: boolean,
  needToAskPermissions: boolean,
};
