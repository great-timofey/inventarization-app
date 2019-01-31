// @flow

export type State = {
  place: string,
  address: string,
  warnings: Array<string>,
  latitude: number,
  longitude: number,
  loading: boolean,
  isNewPlaceScene: boolean,
};

export type Props = {
  navigation: Object,
};
