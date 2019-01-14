// @flow

type Photo = {
  uri: string,
};

export type PhotosProps = {
  item: Photo,
  index: number,
};

export type Props = {
  innerRef?: any,
  userId: string,
  current: Object,
  userRole: string,
  navigation: Object,
  data?: Array<Photo>,
  swipeable: ?boolean,
  currentUser: ?Object,
  selectItem: Function,
  isSortByName: boolean,
  handleShowSortButton: Function,
  toggleDelModalVisible: Function,
  companyId: null | string | number,
  saveSelectedCategories: Array<string>,
  currentSelectItem: number | string | null,
};
