// @flow

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import IconButton from '~/components/IconButton';

import colors from '~/global/colors';
import { isAndroid } from '~/global/device';
import { getPlaceholder, normalize } from '~/global/utils';

import styles from './styles';
import type { Props, State } from './types';

class Item extends PureComponent<Props, State> {
  renderMenu = () => {
    const { selectItem, toggleDelModal, showRemoveButton, item, openItem } = this.props;
    return (
      <View style={styles.menuOverlay}>
        <View style={styles.menuContainer}>
          <IconButton
            size={30}
            iconName="ios-close"
            onPress={() => (selectItem ? selectItem(null) : undefined)}
            customContStyle={[styles.menu, { backgroundColor: colors.white }]}
          />
          {showRemoveButton && (
            <IconButton
              size={20}
              iconColor={colors.white}
              iconName="ios-trash"
              onPress={toggleDelModal}
              customContStyle={[styles.menu, { backgroundColor: colors.red }]}
            />
          )}
          <IconButton
            isCustomIcon
            iconName="pencil"
            onPress={() => openItem(item, true)}
            customContStyle={[styles.menu, { backgroundColor: colors.blue }]}
          />
        </View>
      </View>
    );
  };

  itemRef: any;

  render() {
    const {
      item,
      openItem,
      selectItem,
      showMenuButton,
      getItemPosition,
      currentSelectItem,
      parentScrollViewRef,
    } = this.props;

    const { purchasePrice, photosUrls, photosOfDamagesUrls } = item;
    const isMenuOpen = currentSelectItem === item.id;

    let uri;
    if (photosUrls.length > 0) {
      /*  eslint-disable */
      uri = photosUrls[0];
    } else if (photosOfDamagesUrls.length > 0) {
      uri = photosOfDamagesUrls[0];
      /** eslint-enable */
    } else {
      uri = getPlaceholder(normalize(158));
    }

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => openItem(item)}
        ref={(ref) => { this.itemRef = ref; }}
        onLongPress={isAndroid 
          ? () => getItemPosition(this.itemRef, parentScrollViewRef, item)
          : () => {}
        }
      >
        {isMenuOpen && this.renderMenu()}
        {!isMenuOpen && showMenuButton && !isAndroid && (
          <TouchableOpacity
            onPress={() => (selectItem ? selectItem(item.id) : undefined)}
            style={styles.menuButton}
          >
            <View style={styles.menuButtonDot} />
            <View style={styles.menuButtonDot} />
            <View style={styles.menuButtonDot} />
          </TouchableOpacity>
        )}
        <Image source={{ uri }} style={[styles.image, isMenuOpen && styles.selectImage]} />
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text style={styles.price} numberOfLines={1} ellipsizeMode="tail">
          {`${purchasePrice || 0} ₽`}
        </Text>
      </TouchableOpacity>
    );
  }
}
export default Item;
