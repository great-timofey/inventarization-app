// @flow

//  $FlowFixMe
import React, { memo } from 'react';

import MapView, { Marker } from 'react-native-maps';

import type { Props } from './types';
import styles from './styles';

const Map = ({
  latitude,
  longitude,
  hideMarker,
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
    {!hideMarker && (
    <Marker
      coordinate={{
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      }}
    />
    )}
  </MapView>
);

export default memo(Map);
