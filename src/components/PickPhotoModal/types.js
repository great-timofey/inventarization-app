// @flow

export type ModalProps = {
  isModalVisible: boolean,
  toggleModalCallback: () => void,
  navigationCallback: () => void,
  setPhotoUriCallback: string => void,
};

export type ModalState = {
  photos: Array<Object>,
};

export type PhotoType = {
  item: Object,
  index: number,
};
