//  @flow
import React, { PureComponent } from 'react';
import { Text, View, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import InventoryIcon from 'assets/InventoryIcon';
import colors from 'global/colors';
import constants from 'global/constants';
import globalStyles from 'global/styles';
import styles from './styles';

const iconProps = {
  size: 25,
  borderRadius: 0,
  iconStyle: globalStyles.iconStyle,
  backgroundColor: colors.transparent,
};

type Props = { client: Object };
type State = { data: ?Object, loading: boolean };
class ItemsScene extends PureComponent<Props, State> {
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
        <Text style={styles.header}>{constants.headers.items}</Text>
      </ScrollView>
    );
  }
}

export default ItemsScene;
