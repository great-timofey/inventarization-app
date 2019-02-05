// @flow

import React, { PureComponent } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import { findIndex } from 'ramda';
import { Query, compose, graphql } from 'react-apollo';

import Icon from 'react-native-vector-icons/Ionicons';

import * as AUTH_QUERIES from '~/graphql/auth/queries';

import colors from '~/global/colors';
import constants from '~/global/constants';

import styles from './styles';

type State = {
  isActive: boolean,
  selectedManagerId: string | number | null,
}

type Props = {
  role: string,
  query: Object,
  data: Array<Object>,
  callBackSelectManager: Function,
  selectedManagerId: string | number | null,
}

const AddButton = () => (
  <TouchableOpacity
    onPress={() => {}}
    style={[styles.manager, styles.last]}
  >
    <Text style={styles.button}>
      {constants.buttonTitles.addNewManager}
    </Text>
  </TouchableOpacity>
);
class DropDownMenu extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { selectedManagerId } = this.props;

    this.state = {
      isActive: false,
      selectedManagerId: selectedManagerId || 0,
    };
  }

  toogleMenuActive = () => {
    const { isActive } = this.state;
    this.setState({
      isActive: !isActive,
    });
  }

  selectManager = (id: number | string) => {
    const { callBackSelectManager } = this.props;
    this.setState({
      selectedManagerId: id,
    });
    callBackSelectManager(id);
    this.toogleMenuActive();
  }

  componentDidMount = () => {
    const { data, callBackSelectManager, selectedManagerId } = this.props;

    if (data && data.length > 0 && !selectedManagerId) {
      const defaultManagerId = data[0].id;
      this.setState({
        selectedManagerId: defaultManagerId,
      });
      callBackSelectManager(defaultManagerId);
    }
  }

  renderRow = ({ item, index }: { item: Object, index: number }) => {
    const { isActive } = this.state;
    const isFirstEl = index === 0;

    return (
      <TouchableOpacity
        disabled={!isActive}
        onPress={() => this.selectManager(item.id)}
        style={[
          styles.manager,
          !isActive && styles.one,
          isFirstEl && styles.first,
        ]}
      >
        <View>
          <Text style={styles.topText}>{constants.text.manager}</Text>
          <Text style={styles.botText}>{item.fullName}</Text>
        </View>
        {isFirstEl && (
        <Icon
          size={25}
          color={colors.arrowDownGray}
          onPress={this.toogleMenuActive}
          backgroundColor={colors.transparent}
          name={isActive ? 'ios-arrow-up' : 'ios-arrow-down'}
        />
        )}
      </TouchableOpacity>
    );
  }

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  render() {
    const {
      props: {
        role,
        query,
        toggleModalVisible,
        // $FlowFixMe
        userCompany: {
          company: {
            id: companyId,
          },
        },
      },
      state: {
        isActive,
        selectedManagerId,
      },
    } = this;

    const isUserAdmin = role === constants.roles.admin;

    return (
      <Query query={query} variables={{ companyId, role: 'manager' }}>
        {({ data, loading, error }) => {
          if (error) {
            return (
              <View>
                <Text>{error.message}</Text>
              </View>
            );
          }

          if (loading) {
            return <ActivityIndicator />;
          }

          const managerList = (data && data.users) ? data.users : [];
          const isEmptyManagerList = managerList.length === 0;

          let subData;
          let selectedManagerIndex;

          if (managerList && managerList.length > 0) {
            selectedManagerIndex = findIndex(user => user.id === selectedManagerId, managerList);
            if (selectedManagerIndex === -1) {
              selectedManagerIndex = 0;
            } else {
              subData = [managerList[selectedManagerIndex]];
            }
          }

          return (
            <View style={styles.container}>
              { isUserAdmin && !isActive && !selectedManagerId && (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={isEmptyManagerList
                    ? toggleModalVisible
                    : this.toogleMenuActive
                  }
                >
                  <Text style={styles.button}>
                    {constants.buttonTitles.setManager}
                  </Text>
                </TouchableOpacity>
              )}
              <FlatList
                scrollEnabled={false}
                renderItem={this.renderRow}
                keyExtractor={this.keyExtractor}
                data={isActive ? managerList : subData}
              />
              {isActive && !isEmptyManagerList && <AddButton />}
            </View>
          );
        }}
      </Query>
    );
  }
}

export default compose(
  graphql(AUTH_QUERIES.GET_CURRENT_USER_COMPANY_CLIENT, {
    //  $FlowFixMe
    props: ({ data: { userCompany } }) => ({ userCompany }),
  }),
)(DropDownMenu);
