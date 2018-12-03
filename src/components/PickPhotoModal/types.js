// @flow

export type Props = {
  isModalVisible: boolean,
  onBackCallback: () => void,
  navigationCallback: () => void,
};

export type State = {
  photos: Array<Object>,
};

export type PhotoType = {
  item: Object,
  index: number,
};
