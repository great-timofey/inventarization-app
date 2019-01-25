// @flow

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import type { Props } from './types';

class ListItem extends PureComponent<Props, {}> {
  itemRef: any;

  render() {
    const {
      item,
      openItem,
      getItemPosition,
      parentScrollViewRef,
    } = this.props;

    return (
      <TouchableOpacity
        style={styles.rowItem}
        onPress={() => openItem(item)}
        ref={(ref) => { this.itemRef = ref; }}
        onLongPress={() => getItemPosition(this.itemRef, parentScrollViewRef, item)}
      >
        <Image style={styles.smallImage} />
        <View style={styles.description}>
          <View>
            <Text style={styles.topText}>{item.name}</Text>
            <Text style={styles.botText}>
              {`${(item.photos && item.photos.length) || 0} Фото`}
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
