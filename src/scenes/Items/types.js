// @flow

export type State = {
  searchValue: string,
  isSortByName: boolean,
  isSearchActive: boolean,
  showSortButton: boolean,
  isListViewStyle: boolean,
  isSortModalVisible: boolean,
  isDeleteModalVisible: boolean,
  currentSelectItem: number | string | null,
};

export type Props = {
  navigation: Object,
  currentUserId: number,
  destroyAsset: Function,
  currentUserRole: string,
  currentCompanyId: number,
};
