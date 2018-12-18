// @flow

export type State = {
  isSortByName: boolean,
  isListViewStyle: boolean,
  isSortModalVisible: boolean,
  isDeleteModalVisible: boolean,
  currentSelectItem: number | null,
};

export type Props = {
  navigation: Object,
};
