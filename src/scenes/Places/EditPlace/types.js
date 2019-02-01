// @flow

export type State = {
  place: string,
  address: string,
  latitude: number,
  longitude: number,
  loading: boolean,
  latitudeDelta: number,
  longitudeDelta: number,
  warnings: Array<string>,
  isNewPlaceScene: boolean,
};

export type Props = {
  navigation: Object,
};
