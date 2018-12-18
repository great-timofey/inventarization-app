// @flow

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import IconButton from '~/components/IconButton';

import colors from '~/global/colors';

import styles from './styles';
import type { Props, State } from './types';

class Item extends PureComponent<Props, State> {
  menu = () => {
    const { selectItem } = this.props;
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
          onPress={() => selectItem(null)}
          customContStyle={[styles.menu, { backgroundColor: colors.red }]}
        />
        <IconButton
          isCustomIcon
          iconName="pencil"
          onPress={() => selectItem(null)}
          customContStyle={[styles.menu, { backgroundColor: colors.blue }]}
        />
      </View>
    );
  }


  render() {
    const { currentSelectItem, selectItem, id } = this.props;
    const isMenuOpen = currentSelectItem === id;

    return (
      <View style={styles.container}>
        {isMenuOpen && this.menu()}
        {!isMenuOpen && (
        <TouchableOpacity onPress={() => selectItem(id)} style={styles.menuButton}>
          <View style={styles.menuButtonDot} />
          <View style={styles.menuButtonDot} />
          <View style={styles.menuButtonDot} />
        </TouchableOpacity>
        )}
        <View style={[styles.image, isMenuOpen && styles.selectImage]} />
        <Text style={styles.title}>MacBook Pro 13 Late</Text>
        <Text style={styles.price}>110 000 ₽</Text>
      </View>
    );
  }
}
export default Item;
