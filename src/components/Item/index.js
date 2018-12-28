// @flow

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import IconButton from '~/components/IconButton';

import colors from '~/global/colors';
import constants from '~/global/constants';

import styles from './styles';
import type { Props, State } from './types';

class Item extends PureComponent<Props, State> {
  menu = () => {
    const { selectItem, toggleDelModal } = this.props;
    return (
      <View style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
        <IconButton
          size={30}
          iconName="ios-close"
          onPress={() => (selectItem ? selectItem(null) : undefined)}
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
  }


  render() {
    const {
      item,
      selectItem,
      currentUserRole,
      currentSelectItem,
    } = this.props;
    const { purchasePrice } = item;
    const isMenuOpen = currentSelectItem === item.id;
    const showMenuButton = currentUserRole !== constants.roles.observer;

    return (
      <View style={styles.container}>
        {isMenuOpen && this.menu()}
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
        {purchasePrice && <Text style={styles.price}>{`${purchasePrice} ₽`}</Text>}
      </View>
    );
  }
}
export default Item;
