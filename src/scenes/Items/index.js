//  @flow
import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

function ItemsScene() {
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>ITEMS</Text>
    </View>
  );
}

export default ItemsScene;
