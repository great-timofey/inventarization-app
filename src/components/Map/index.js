// @flow
import React, { PureComponent } from 'react';

import MapView from 'react-native-maps';

import type { Props } from './types';
import styles from './styles';

const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

class Map extends PureComponent<Props> {
  render() {
    const { customStyles, region, ...rest } = this.props;
    const coordsToShow = { ...region, ...deltas };
    return <MapView {...rest} initialRegion={coordsToShow} style={[styles.map, customStyles]} />;
  }
}

export default Map;
