// @flow

type Photo = {
  uri: string,
};

export type PhotosProps = {
  item: Photo,
  index: number,
};

export type Props = {
  navigation: Object,
  data?: Array<Photo>,
  innerRef?: any,
  userRole: string,
  selectItem: Function,
  currentSelectItem: number | string | null,
  companyId: null | string | number,
  isSortByName: boolean,
  swipeable: ?boolean,
  toggleDelModalVisible: Function,
  userId: string,
  handleShowSortButton: Function,
};
