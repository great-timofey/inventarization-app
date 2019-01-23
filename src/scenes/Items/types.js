// @flow

export type State = {
  searchValue: string,
  isSortByName: boolean,
  isSearchActive: boolean,
  showSortButton: boolean,
  isListViewStyle: boolean,
  isSortModalVisible: boolean,
  isDeleteModalVisible: boolean,
  isAndroidActionsModalVisible: boolean,
  currentSelectItem: number | string | null,
  itemData: {
    x: number,
    y: number,
    name: string,
    purchasePrice: string,
  },
};

export type Props = {
  data?: any,
  navigation: Object,
  currentUserId: number,
  destroyAsset: Function,
  currentUserRole: string,
  currentCompanyId: number,
};
