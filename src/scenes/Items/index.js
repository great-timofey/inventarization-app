//  @flow
import React, { PureComponent } from 'react';
import { Text, Image, View, ScrollView, FlatList } from 'react-native';

import InventoryIcon from 'assets/InventoryIcon';
import Icon from 'react-native-vector-icons/Feather';

import { getPlaceholder } from 'global/utils';
import { deviceWidth } from 'global/utils';
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
type State = { items: Array<Object> };
class ItemsScene extends PureComponent<Props, State> {
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

  state = {
    items: [
      { name: 'macbook', price: '120000' },
      { name: 'macbook', price: '120000' },
      { name: 'macbook', price: '120000' },
      { name: 'macbook', price: '120000' },
    ],
  };

  renderItem = ({ item: { name, price } }) => (
    <View style={{ flexBasis: 158 }}>
      <Image
        source={{ uri: getPlaceholder(158) }}
        style={{ width: 158, height: 158 }}
      />
      <Text>{name}</Text>
      <Text>{price}</Text>
    </View>
  );

  render() {
    const { items } = this.state;
    return (
      <ScrollView>
        <Text style={styles.header}>Предметы</Text>
        <Text>here goes filters</Text>
        <View
          style={{
            flex: 1,
          }}
        >
          <FlatList
            data={items}
            contentContainerStyle={{
              justifyContent: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
            renderItem={this.renderItem}
          />
        </View>
      </ScrollView>
    );
  }
}

export default ItemsScene;
