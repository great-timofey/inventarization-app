// @flow

export type State = {
  searchValue: string,
  isSortByName: boolean,
  isSearchActive: boolean,
  isListViewStyle: boolean,
  isSortModalVisible: boolean,
  isDeleteModalVisible: boolean,
  currentSelectItem: number | null,
};

export type Props = {
  navigation: Object,
};
