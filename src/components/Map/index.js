// @flow

<<<<<<< HEAD
=======
//  $FlowFixMe
import React, { memo } from 'react';

>>>>>>> aa5af5a52cebac2fc8642f0d54db1f0b9df6c3c0
import MapView, { Marker } from 'react-native-maps';

import type { Props } from './types';
import styles from './styles';

<<<<<<< HEAD
const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

class Map extends PureComponent<Props> {
  render() {
    const { customStyles, region, ...rest } = this.props;
    const coordsToShow = { ...region, ...deltas };
    return (
      <MapView
        {...rest}
        initialRegion={coordsToShow}
        style={[styles.map, customStyles]}
      >
        <Marker coordinate={coordsToShow} />
      </MapView>
    );
  }
}
=======
const Map = ({
  latitude,
  longitude,
  customStyles,
  latitudeDelta,
  longitudeDelta,
  changeRegionCallback,
  ...rest
}: Props) => (
  <MapView
    {...rest}
    region={{
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    }}
    showsCompass={false}
    style={[styles.map, customStyles]}
    onRegionChangeComplete={changeRegionCallback}
  >
    <Marker
      coordinate={{
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      }}
    />
  </MapView>
);
>>>>>>> aa5af5a52cebac2fc8642f0d54db1f0b9df6c3c0

export default memo(Map);
