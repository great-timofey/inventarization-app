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
  isNewPlaceScene: boolean,
};

export type Props = {
  navigation: Object,
  userCompany: Object,
  createPlace: Function,
};
