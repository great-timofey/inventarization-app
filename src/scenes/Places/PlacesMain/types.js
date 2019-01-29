// @flow

export type State = {
  searchValue: string,
  isSearchActive: boolean,
  isDeleteModalVisible: boolean,
  currentSelectItem: null | string | number
};

export type Props = {
  navigation: Object,
  userCompany: Object,
  destroyPlace: Function,
};
