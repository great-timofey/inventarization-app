// @flow

export type State = {
  place: Object | null,
  elementPosition: {
    x: number,
    y: number,
  },
  searchValue: string,
  isSearchActive: boolean,
  isDeleteModalVisible: boolean,
  isMarginBottomActive: boolean,
  isAndroidActionsModalVisible: boolean,
  currentSelectItem: null | string | number

};

export type Props = {
  navigation: Object,
  userCompany: Object,
  destroyPlace: Function,
};
