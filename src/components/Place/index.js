// @flow

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import type { Props } from './types';

import assets from '~/global/assets';
import { isAndroid } from '~/global/device';

class Place extends PureComponent<Props, {}> {
  itemRef: any;

  render() {
    const {
      place,
      getItemPosition,
      parentScrollViewRef,
    } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {}}
        style={styles.rowItem}
        ref={(ref) => { this.itemRef = ref; }}
        onLongPress={isAndroid
          ? () => getItemPosition(this.itemRef, parentScrollViewRef, place)
          : () => {}
        }
      >
        <Image style={styles.pinImage} source={assets.pin} />
        <Image style={styles.image} source={assets.mapLayout} />
        <View style={styles.description}>
          <View>
            <Text style={styles.topText}>{place.name}</Text>
            <Text style={styles.botText}>
              {place.address}
            </Text>
          </View>
          <View style={styles.count}>
            <Text style={styles.countText}>{place.assetsCount || '0'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
export default Place;
