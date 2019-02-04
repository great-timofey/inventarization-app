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
  selectedManagerId: string | number | null,
}

type Props = {
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
        data,
      },
      state: {
        isActive,
        selectedManagerId,
      },
    } = this;

    let subData;
    let selectedManagerIndex;

    if (data) {
      selectedManagerIndex = findIndex(user => user.id === selectedManagerId, data);
      if (selectedManagerIndex === -1) {
        selectedManagerIndex = 0;
      } else {
        subData = [data[selectedManagerIndex]];
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
        {isActive && <AddButton />}
      </View>
    ) : (
      null
    );
  }
}

export default DropDownMenu;
