// @flow

export type Props = {
  navigation: Object,
  userCompany: Object,
  createAsset: Function,
  createdAssetsCount: number,
  setCreatedAssetsCount: Function,
};

type Photo = {
  uri: string,
};

export type PhotosProps = {
  item: Photo,
  index: number,
};

export type State = {
  flashMode: number,
  isLoading: boolean,
  photos: Array<Photo>,
  isHintOpened: boolean,
  ableToTakePicture: boolean,
  needToAskPermissions: boolean,
};
