// @flow

export type State = {
  place: string,
  address: string,
  warnings: Object,
  latitude: number,
  loading: boolean,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
  isModalVisible: boolean,
  isNewPlaceScene: boolean,
  isManagerSelectActive: boolean,
  selectedManagerId: null | number | string,
};

export type Props = {
  navigation: Object,
  userCompany: Object,
  createPlace: Function,
  updatePlace: Function,
};
