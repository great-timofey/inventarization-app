// @flow

import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const Item = () => (
  <View style={styles.container}>
    <View style={styles.image} />
    <Text style={styles.title}>MacBook Pro 13 Late</Text>
    <Text style={styles.price}>110 000 ₽</Text>
  </View>
);

export default Item;
