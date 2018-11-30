//  @flow
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

import InventoryIcon from 'assets/InventoryIcon';
import Icon from 'react-native-vector-icons/Feather';

import colors from 'global/colors';
import globalStyles from 'global/styles';
import styles from './styles';

type Props = {};
const iconProps = {
  size: 25,
  borderRadius: 0,
  iconStyle: globalStyles.iconStyle,
  backgroundColor: colors.transparent,
};

class ItemsScene extends PureComponent<Props> {
  static navigationOptions = () => ({
    header: () => (
      <View
        style={{
          height: 65,
          paddingTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          justifyContent: 'space-between',
        }}
      >
        <Icon.Button
          {...iconProps}
          name="grid"
          backgroundColor="transparent"
          color={colors.accent}
        />
        <View style={{ flexDirection: 'row', paddingRight: 10 }}>
          <InventoryIcon.Button
            {...iconProps}
            name="dashboard"
            backgroundColor="transparent"
            color={colors.accent}
          />
          <InventoryIcon.Button
            {...iconProps}
            name="search"
            backgroundColor="transparent"
            color={colors.accent}
          />
        </View>
      </View>
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
