// @flow

import type { Item } from '~/global/types';

export type State = {
  item: Item | null,
  searchValue: string,
  isSortByName: boolean,
  isSearchActive: boolean,
  showSortButton: boolean,
  isListViewStyle: boolean,
  isSortModalVisible: boolean,
  isMarginBottomActive: boolean,
  isDeleteModalVisible: boolean,
  isAndroidActionsModalVisible: boolean,
  currentSelectItem: number | string | null,
  elementPosition: {
    x: number,
    y: number,
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
