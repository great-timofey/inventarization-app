//  @flow
import React, { PureComponent } from 'react';
import { Text, View, ScrollView } from 'react-native';

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

type Props = {};
class ItemsScene extends PureComponent<Props> {
  static navigationOptions = () => ({
    header: () => (
      <View style={styles.headerContainer}>
        <Icon.Button
          {...iconProps}
          name="grid"
          color={colors.accent}
          backgroundColor={colors.transparent}
        />
        <View style={styles.headerRightButtonsContainer}>
          <InventoryIcon.Button
            {...iconProps}
            name="dashboard"
            color={colors.accent}
            backgroundColor={colors.transparent}
          />
          <InventoryIcon.Button
            {...iconProps}
            name="search"
            color={colors.accent}
            backgroundColor={colors.transparent}
          />
        </View>
      </View>
    ),
  });

  render() {
    return (
      <ScrollView>
        <Text style={styles.header}>Предметы</Text>
      </ScrollView>
    );
  }
}

export default ItemsScene;
