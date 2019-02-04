// @flow

import React, { PureComponent } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { findIndex } from 'ramda';

import Icon from 'react-native-vector-icons/Ionicons';

import colors from '~/global/colors';
import constants from '~/global/constants';

import styles from './styles';

type State = {
  isActive: boolean,
  dataLength: number | null,
  selectedEmployeeId: string | number | null,
}

type Props = {
  data: Array<Object>,
  callBackSelectEmployee: Function
}

class DropDownMenu extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { data } = this.props;

    this.state = {
      isActive: false,
      selectedEmployeeId: 0,
      dataLength: data.length || null,
    };
  }

  toogleMenuActive = () => {
    const { isActive } = this.state;
    this.setState({
      isActive: !isActive,
    });
  }

  selectEmployee = (id: number | string) => {
    const { callBackSelectEmployee } = this.props;
    this.setState({
      selectedEmployeeId: id,
    });
    callBackSelectEmployee(id);
    this.toogleMenuActive();
  }

  componentDidMount = () => {
    const { data, callBackSelectEmployee } = this.props;

    if (data.length > 0) {
      const defaultEmployeeId = data[0].id;
      this.setState({
        selectedEmployeeId: defaultEmployeeId,
      });
      callBackSelectEmployee(defaultEmployeeId);
    }
  }

  renderRow = ({ item, index }: { item: Object, index: number }) => {
    const { isActive, dataLength } = this.state;
    const isFirstEl = index === 0;
    const isLastEl = dataLength ? index === dataLength - 1 : null;

    return (
      <TouchableOpacity
        disabled={!isActive}
        onPress={() => this.selectEmployee(item.id)}
        style={[
          styles.employee,
          isLastEl && styles.last,
          !isActive && styles.one,
          isFirstEl && styles.first,
        ]}
      >
        <View>
          <Text style={styles.topText}>{constants.text.employee}</Text>
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
        data,
      },
      state: {
        isActive,
        selectedEmployeeId,
      },
    } = this;

    let subData;
    let selectedEmployeeIndex;

    if (data) {
      selectedEmployeeIndex = findIndex(user => user.id === selectedEmployeeId, data);
      if (selectedEmployeeIndex === -1) {
        selectedEmployeeIndex = 0;
      } else {
        subData = [data[selectedEmployeeIndex]];
      }
    }

    return data ? (
      <View style={styles.container}>
        <FlatList
          scrollEnabled={false}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          data={isActive ? data : subData}
        />
      </View>
    ) : (
      null
    );
  }
}

export default DropDownMenu;
