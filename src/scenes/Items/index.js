//  @flow
import React, { PureComponent } from 'react';
import { Text, View, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { Query } from 'react-apollo';
import * as QUERIES from 'graphql/auth/queries';
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
        <View style={{ alignItems: 'center' }}>
          <Query query={QUERIES.GET_CURRENT_USER}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading...</Text>;
              if (error) return <Text>{error.message}</Text>;

              return (
                <Text>
                  name: {data.current.fullName}, id: {data.current.id}
                </Text>
              );
            }}
          </Query>
        </View>
      </ScrollView>
    );
  }
}

export default ItemsScene;
