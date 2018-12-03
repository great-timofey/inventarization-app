// @flow

export type ModalProps = {
  isModalVisible: boolean,
  onBackCallback: () => void,
  navigationCallback: () => void,
};

export type ModalState = {
  photos: Array<Object>,
};

export type PhotoType = {
  item: Object,
  index: number,
};
