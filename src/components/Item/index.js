// @flow

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import IconButton from '~/components/IconButton';

import colors from '~/global/colors';

import styles from './styles';
import type { Props, State } from './types';

class Item extends PureComponent<Props, State> {
  renderMenu = () => {
    const { selectItem, toggleDelModal, showRemoveButton, item, openItem } = this.props;
    return (
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
    );
  };

  render() {
    const { item, selectItem, showMenuButton, currentSelectItem, openItem } = this.props;
    const { purchasePrice } = item;
    const isMenuOpen = currentSelectItem === item.id;

    return (
      <TouchableOpacity style={styles.container} onPress={() => openItem(item)}>
        {isMenuOpen && this.renderMenu()}
        {!isMenuOpen && showMenuButton && (
          <TouchableOpacity
            onPress={() => (selectItem ? selectItem(item.id) : undefined)}
            style={styles.menuButton}
          >
            <View style={styles.menuButtonDot} />
            <View style={styles.menuButtonDot} />
            <View style={styles.menuButtonDot} />
          </TouchableOpacity>
        )}
        <View style={[styles.image, isMenuOpen && styles.selectImage]} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>{`${purchasePrice || 0} ₽`}</Text>
      </TouchableOpacity>
    );
  }
}
export default Item;
