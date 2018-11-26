//  @flow
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

type Props = {};
export default function AuthScene(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>You arent logged</Text>
    </View>
  );
}
