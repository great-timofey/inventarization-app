// @flow

export type ModalProps = {
  isModalVisible: boolean,
  navigationCallback: () => void,
  toggleModalCallback: () => void,
  setPhotoUriLocalCallback: string => void,
};

export type ModalState = {
  photos: Array<Object>,
};

export type PhotoType = {
  item: Object,
  index: number,
};
