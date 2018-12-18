//  @flow

import React, { Fragment, PureComponent } from 'react';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Query, graphql } from 'react-apollo';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import Item from '~/components/Item';
import SortModal from '~/components/SortModal';
import IconButton from '~/components/IconButton';
import SwipebleListItem from '~/components/Swipe';
import InventoryIcon from '~/assets/InventoryIcon';
import QuestionModal from '~/components/QuestionModal';

import gql from 'graphql-tag';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import constants from '~/global/constants';
import globalStyles from '~/global/styles';
import * as QUERIES from '~/graphql/auth/queries';
import styles from './styles';
import type { Props, State } from './types';

const iconProps = {
  borderRadius: 0,
  activeOpacity: 0.5,
  size: normalize(25),
  iconStyle: globalStyles.iconStyle,
  underlayColor: colors.transparent,
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
        name="menu"
        onPress={() => {}}
        style={styles.icon}
        activeOpacity={0.5}
        size={normalize(30)}
        color={colors.white}
        iconStyle={{ margin: 0 }}
        underlayColor="transparent"
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
    const toggleViewStyle = state.params && state.params.toggleViewStyle;
    const isListViewStyle = state.params && state.params.isListViewStyle;

    return {
      header: () => (
        <View style={styles.headerContainer}>
          <Icon.Button
            {...iconProps}
            color={colors.accent}
            onPress={toggleViewStyle}
            backgroundColor={colors.transparent}
            name={isListViewStyle ? 'list' : 'grid'}
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
      isSortByName: true,
      isListViewStyle: false,
      currentSelectItem: null,
      isSortModalVisible: false,
      isDeleteModalVisible: false,
    };

    navigation.setParams({
      isTitleVisible: false,
      isListViewStyle: false,
      toggleViewStyle: this.toggleViewStyle,
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

  toggleSortModalVisible = () => {
    const { isSortModalVisible } = this.state;
    this.setState({
      isSortModalVisible: !isSortModalVisible,
    });
  };

  toggleDelModalVisible = () => {
    const { isDeleteModalVisible } = this.state;
    this.setState({
      isDeleteModalVisible: !isDeleteModalVisible,
    });
  };

  toggleViewStyle = () => {
    const { navigation } = this.props;
    const { isListViewStyle } = this.state;

    this.setState({
      isListViewStyle: !isListViewStyle,
      currentSelectItem: null,
    });

    navigation.setParams({
      isListViewStyle: !isListViewStyle,
    });
  };

  toggleSortMethod = () => {
    const { isSortByName } = this.state;
    this.setState({
      isSortByName: !isSortByName,
    },
    this.toggleSortModalVisible);
  }

  selectItem = (id: number) => {
    this.setState({
      currentSelectItem: id,
    });
  }

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  navListener: any;

  componentDidMount() {
    const { navigation } = this.props;
    this.navListener = navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  render() {
    const {
      isSortByName,
      isListViewStyle,
      currentSelectItem,
      isSortModalVisible,
      isDeleteModalVisible,
    } = this.state;

    return (
      <Fragment>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={this.handleScroll}
        >
          <Text style={styles.header}>{constants.headers.items}</Text>
          { !isListViewStyle && (
          <CategoryList>
            <FlatList
              horizontal
              data={data}
              renderItem={this.renderTab}
              keyExtractor={this.keyExtractor}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalFlatList}
            />
          </CategoryList>
          )}
          {isListViewStyle ? (
            <SwipebleListItem
              toggleDelModal={this.toggleDelModalVisible}
            />
          ) : (
            <FlatList
              data={data}
              numColumns={2}
              renderItem={item => (
                <Item
                  id={item.index}
                  selectItem={this.selectItem}
                  currentSelectItem={currentSelectItem}
                  toggleDelModal={this.toggleDelModalVisible}
                />
              )}
              keyExtractor={this.keyExtractor}
              extraData={currentSelectItem}
              contentContainerStyle={styles.grid}
            />
          )}

        </ScrollView>
        {!isSortModalVisible && (
          <IconButton
            isCustomIcon
            size={isSortByName ? 50 : 70}
            onPress={this.toggleSortModalVisible}
            customPosition={{ position: 'absolute', right: 30, bottom: 30 }}
            iconName={isSortByName ? 'button-sort-name' : 'button-sort-price'}
            customIconStyle={!isSortByName ? { top: normalize(-4), left: normalize(-6) } : {}}
          />
        )}
        <SortModal
          isSortByName={isSortByName}
          isModalVisible={isSortModalVisible}
          toggleSortMethod={this.toggleSortMethod}
          toggleModalVisible={this.toggleSortModalVisible}
        />
        <QuestionModal
          leftAction={this.toggleDelModalVisible}
          rightAction={() => {}}
          isModalVisible={isDeleteModalVisible}
          data={constants.modalQuestion.itemDel}
        />
      </Fragment>
    );
  }
}

export default ItemsScene;
