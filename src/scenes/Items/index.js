//  @flow

import React, { Fragment, PureComponent } from 'react';
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

import Item from '~/components/Item';
import SortModal from '~/components/Modal';
import SortButton from '~/components/SortButton';
import InventoryIcon from '~/assets/InventoryIcon';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import constants from '~/global/constants';
import globalStyles from '~/global/styles';
import * as QUERIES from '~/graphql/auth/queries';
import styles from './styles';
import type { Props, State } from './types';

const iconProps = {
  borderRadius: 0,
  size: normalize(25),
  iconStyle: globalStyles.iconStyle,
  backgroundColor: colors.transparent,
};

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
  static navigationOptions = ({ navigation }: { navigation: Object }) => {
    const { state } = navigation;
    const isTitleVisible = state.params && state.params.isTitleVisible;
    return {
      header: () => (
        <View style={styles.headerContainer}>
          <Icon.Button
            {...iconProps}
            name="grid"
            color={colors.accent}
            backgroundColor={colors.transparent}
          />
          <Text
            style={[styles.headerTitle, isTitleVisible && { color: 'black' }]}
          >
            {constants.headers.items}
          </Text>
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
    };
  };

  constructor(props: Props) {
    super(props);
    const { navigation } = this.props;

    this.state = {
      isModalVisible: false,
      isSortByName: true,
    };

    navigation.setParams({
      isTitleVisible: false,
    });
  }

  renderTab = ({ item, index }) => (
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

  handleScroll = (event: Object) => {
    const { navigation } = this.props;
    if (event.nativeEvent.contentOffset.y >= 40) {
      navigation.setParams({
        isTitleVisible: true,
      });
    } else {
      navigation.setParams({
        isTitleVisible: false,
      });
    }
  };

  toggleModalVisible = () => {
    const { isModalVisible } = this.state;
    this.setState({
      isModalVisible: !isModalVisible,
    });
  };

  toggleSortMethod = () => {
    const { isSortByName } = this.state;
    this.setState({
      isSortByName: !isSortByName,
    },
    this.toggleModalVisible);
  }

  render() {
    const { isModalVisible, isSortByName } = this.state;
    console.log(isModalVisible, isSortByName);

    return (
      <Fragment>
        <ScrollView
          style={styles.container}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
        >
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
          <View style={styles.itemsGrid}>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </View>
        </ScrollView>
        {!isModalVisible && (
          <SortButton
            size={isSortByName ? 50 : 70}
            iconName={isSortByName ? 'button-sort-name' : 'button-sort-price'}
            onPress={this.toggleModalVisible}
            customStyle={[
              styles.sortButtonCustomStyle, isSortByName && { paddingLeft: normalize(3) },
            ]}
            customPosition={!isSortByName ? { top: normalize(-4), left: normalize(-6) } : {}}
          />
        )}
        <SortModal
          isSortByName={isSortByName}
          isModalVisible={isModalVisible}
          toggleSortMethod={this.toggleSortMethod}
          toggleModalVisible={this.toggleModalVisible}
        />
      </Fragment>
    );
  }
}

export default ItemsScene;
