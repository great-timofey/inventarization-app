//  @flow
import React, { Component } from 'react';
import { Text, View, ScrollView, StatusBar } from 'react-native';

import { Query } from 'react-apollo';
import Icon from 'react-native-vector-icons/Feather';

import colors from 'global/colors';
import { normalize } from 'global/utils';
import constants from 'global/constants';
import globalStyles from 'global/styles';
import * as QUERIES from 'graphql/auth/queries';
import InventoryIcon from 'assets/InventoryIcon';
import styles from './styles';

const iconProps = {
  borderRadius: 0,
  size: normalize(25),
  iconStyle: globalStyles.iconStyle,
  backgroundColor: colors.transparent,
};

type Props = { client: Object };
type State = { data: ?Object, loading: boolean };
class ItemsScene extends Component<Props, State> {
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

  componentDidMount() {
    const { navigation } = this.props;
    this._navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

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
