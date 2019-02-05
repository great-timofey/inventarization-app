// @flow

export type State = {
  id: string,
  gps: Object,
  name: string,
  address: string,
  searchValue: string,
  isSortByName: boolean,
  isSearchActive: boolean,
  showSortButton: boolean,
  isListViewStyle: boolean,
  isSortModalVisible: boolean,
  isDeleteModalVisible: boolean,
  isAndroidActionsModalVisible: boolean,
  currentSelectItem: null | string | number,
};

export type Props = {
  navigation: Object,
  destroyAsset: Function,
};
