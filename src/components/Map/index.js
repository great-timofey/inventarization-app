// @flow
import React, { memo } from 'react';

import MapView, { Marker } from 'react-native-maps';

import type { Props } from './types';
import styles from './styles';

const Map = ({ customStyles, changeRegionCallback, region, ...rest }: Props) => (
  <MapView
    {...rest}
    region={region}
    showsCompass={false}
    style={[styles.map, customStyles]}
    onRegionChangeComplete={changeRegionCallback}
  >
    <Marker
      coordinate={region}
    />
  </MapView>
);

export default memo(Map);
