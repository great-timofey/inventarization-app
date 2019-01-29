
// @flow

import React, { PureComponent } from 'react';

import MapView from 'react-native-maps';

import type { Props } from './types';
import styles from './styles';

class Map extends PureComponent<Props> {
  state = {

  };

  render() {
    const { customStyles } = this.props;
    return (
      <MapView
        style={[styles.map, customStyles]}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    );
  }
}

export default Map;
