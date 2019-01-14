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
  selectedCategories: Array<string>,
  companyId: null | string | number,
  currentSelectItem: number | string | null,
};
