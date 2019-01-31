// @flow

export type Props = {
  navigation: Object,
  userCompany: Object,
  createAsset: Function,
  createdAssetsCount: number,
  setCreatedAssetsCount: Function,
};

export type PhotosProps = {
  item: string,
  index: number,
};

export type State = {
  flashMode: number,
  isLoading: boolean,
  photos: Array<string>,
  isHintOpened: boolean,
  ableToTakePicture: boolean,
  needToAskPermissions: boolean,
};
