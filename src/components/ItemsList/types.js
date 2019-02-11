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
  placeId: string,
  current: Object,
  userRole: string,
  navigation: Object,
  searchValue: string,
  data?: Array<Photo>,
  swipeable: ?boolean,
  currentUser: ?Object,
  selectItem: Function,
  isSortByName: boolean,
  toggleSearch: Function,
  isSearchActive: boolean,
  getItemPosition: Function,
  isMarginBottomActive: boolean,
  handleShowSortButton: Function,
  toggleDelModalVisible: Function,
  companyId: null | string | number,
  saveSelectedCategories: Array<string>,
  isAndroidActionsModalVisible: boolean,
  currentSelectItem: number | string | null,
};
