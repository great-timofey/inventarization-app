// @flow

export type Props = {
  region?: Object,
  latitude: number,
  longitude: number,
  hideMarker: ?boolean,
  latitudeDelta: number,
  customStyles?: Object,
  longitudeDelta: number,
  changeRegionCallback: Function,
};
