//  @flow
import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

type Props = {};
export default function AddItemScene(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Add New Item</Text>
    </View>
  );
}
