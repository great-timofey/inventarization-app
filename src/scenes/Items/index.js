//  @flow
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

import InventoryIcon from 'assets/InventoryIcon';

import colors from 'global/colors';
import styles from './styles';

type Props = {};

class ItemsScene extends PureComponent<Props> {
  static navigationOptions = () => ({
    title: 'Предметы',

    headerLeft: (
      <InventoryIcon.Button
        size={25}
        name="tile"
        backgroundColor="transparent"
        color={colors.accent}
      />
    ),
    headerRight: (
      <InventoryIcon.Button
        size={25}
        name="search"
        backgroundColor="transparent"
        color={colors.accent}
      />
    ),
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
