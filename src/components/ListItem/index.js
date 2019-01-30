// @flow

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import type { Props } from './types';

import { isAndroid } from '~/global/device';
import { getPlaceholder, normalize } from '~/global/utils';

class ListItem extends PureComponent<Props, {}> {
  itemRef: any;

  render() {
    const {
      item,
      openItem,
      getItemPosition,
      parentScrollViewRef,
    } = this.props;

    const { photosUrls, photosOfDamagesUrls } = item;

    let uri;
    if (photosUrls.length > 0) {
      /*  eslint-disable */
      uri = photosUrls[0];
    } else if (photosOfDamagesUrls.length > 0) {
      uri = photosOfDamagesUrls[0];
      /** eslint-enable */
    } else {
      uri = getPlaceholder(normalize(62));
    }

    return (
      <TouchableOpacity
        style={styles.rowItem}
        onPress={() => openItem(item)}
        ref={(ref) => { this.itemRef = ref; }}
        onLongPress={isAndroid 
          ? () => getItemPosition(this.itemRef, parentScrollViewRef, item)
          : () => {}
        }
      >
        <Image source={{ uri }} style={styles.smallImage} />
        <View style={styles.description}>
          <View>
            <Text style={styles.topText}>{item.name}</Text>
            <Text style={styles.botText}>
              {`${(photosUrls && photosUrls.length) || 0} Фото`}
            </Text>
          </View>
          <View style={styles.count}>
            <Text style={styles.countText}>{item.purchasePrice}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
export default ListItem;
