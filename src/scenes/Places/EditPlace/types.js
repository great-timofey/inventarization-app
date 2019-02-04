// @flow

export type State = {
  place: string,
  address: string,
  warnings: Array<string>,
  latitude: number,
  longitude: number,
  loading: boolean,
  isNewPlaceScene: boolean,
  isEmployeeSelectActive: boolean
  selectedEmployeeId: null | number | string
};

export type Props = {
  navigation: Object,
};
