//  @flow
import React, { PureComponent } from 'react';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Query } from 'react-apollo';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

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

const data = [
  'Компьютеры',
  'Мебель',
  'Компьютеры',
  'Мебель',
  'Компьютеры',
  'Мебель',
  'Компьютеры',
  'Мебель',
  'Мебель',
  'Компьютеры',
  'Мебель',
  'Компьютеры',
  'Мебель',
];

const CategoryList = ({ children }) => (
  <View style={styles.categoryListContainer}>
    <View style={styles.categoryButton}>
      <InventoryIcon.Button
        {...iconProps}
        size={normalize(30)}
        name="menu"
        color={colors.white}
        style={styles.icon}
        iconStyle={{ margin: 0 }}
        onPress={() => {}}
        underlayColor="transparent"
        activeOpacity={0.5}
        backgroundColor={colors.transparent}
      />
    </View>
    {children}
  </View>
);

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

  renderTab = ({ item, index }: InviteeProps) => (
    <TouchableOpacity>
      <LinearGradient
        useAngle
        angle={339}
        end={{ x: 0, y: 0 }}
        start={{ x: 1, y: 1 }}
        style={styles.tabContainer}
        colors={colors.catButton[index]}
      >
        <Text style={styles.tabText}>{item}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>{constants.headers.items}</Text>
        <CategoryList>
          <FlatList
            horizontal
            data={data}
            keyExtractor={item => item}
            renderItem={this.renderTab}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalFlatList}
          />
        </CategoryList>

        {/* <Query query={QUERIES.GET_CURRENT_USER}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading...</Text>;
              if (error) return <Text>{error.message}</Text>;

              return (
                <Text>
                  name: {data.current.fullName}, id: {data.current.id}
                </Text>
              );
            }}
          </Query> */}
      </ScrollView>
    );
  }
}

export default ItemsScene;
