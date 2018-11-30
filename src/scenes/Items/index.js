//  @flow
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

type Props = {};
class ItemsScene extends PureComponent<Props> {
  static navigationOptions = () => ({
    title: 'Предметы',
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>ITEMS</Text>
      </View>
    );
  }
}

export default ItemsScene;
