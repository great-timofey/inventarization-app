// @flow

export type State = {
  searchValue: string,
  isSearchActive: boolean,
  currentSelectItem: null | string | number
};

export type Props = {
  navigation: Object,
  userCompany: Object,
};
