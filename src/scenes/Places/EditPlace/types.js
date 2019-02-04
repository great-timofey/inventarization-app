// @flow

export type State = {
  place: string,
  address: string,
  loading: boolean,
  latitude: number,
  longitude: number,
  isModalVisible: boolean,
  warnings: Array<string>,
  isNewPlaceScene: boolean,
  isManagerSelectActive: boolean,
  selectedManagerId: null | number | string,
};

export type Props = {
  navigation: Object,
  userCompany: Object,
  createPlace: Function,
};
