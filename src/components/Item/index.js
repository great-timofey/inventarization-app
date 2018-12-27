// @flow

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import IconButton from '~/components/IconButton';

import colors from '~/global/colors';
import constants from '~/global/constants';

import styles from './styles';
import type { Props, State } from './types';

class Item extends PureComponent<Props, State> {
  renderMenu = () => {
    const { selectItem, toggleDelModal } = this.props;
    return (
      <View style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
        <IconButton
          size={30}
          iconName="ios-close"
          onPress={() => selectItem(null)}
          customContStyle={[styles.menu, { backgroundColor: colors.white }]}
        />
        <IconButton
          size={20}
          iconColor={colors.white}
          iconName="ios-trash"
          onPress={toggleDelModal}
          customContStyle={[styles.menu, { backgroundColor: colors.red }]}
        />
        <IconButton
          isCustomIcon
          iconName="pencil"
          onPress={() => {}}
          customContStyle={[styles.menu, { backgroundColor: colors.blue }]}
        />
      </View>
    );
  };

  render() {
    const { item, openItem, selectItem, showMenuButton, currentSelectItem } = this.props;
    const isMenuOpen = currentSelectItem === item.id;

    return (
      <TouchableOpacity style={styles.container} onPress={() => openItem(item)}>
        {isMenuOpen && this.renderMenu()}
        {!isMenuOpen && showMenuButton && (
          <TouchableOpacity onPress={() => selectItem(item.id)} style={styles.menuButton}>
            <View style={styles.menuButtonDot} />
            <View style={styles.menuButtonDot} />
            <View style={styles.menuButtonDot} />
          </TouchableOpacity>
        )}
        <View style={[styles.image, isMenuOpen && styles.selectImage]} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>{`${item.purchasePrice} ₽`}</Text>
      </TouchableOpacity>
    );
  }
}
export default Item;
