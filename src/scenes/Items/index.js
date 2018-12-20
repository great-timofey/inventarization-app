//  @flow

import React, { Fragment, PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Query, graphql } from 'react-apollo';

import LinearGradient from 'react-native-linear-gradient';

import Item from '~/components/Item';
import Button from '~/components/Button';
import Search from '~/components/Search';
import SortModal from '~/components/SortModal';
import IconButton from '~/components/IconButton';
import SwipebleListItem from '~/components/Swipe';
import MainHeader from '~/scenes/Items/MainHeader';
import InventoryIcon from '~/assets/InventoryIcon';
import QuestionModal from '~/components/QuestionModal';
import SearchHeader from '~/scenes/Items/SearchHeader';
import gql from 'graphql-tag';

import assets from '~/global/assets';
import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import constants from '~/global/constants';
import * as QUERIES from '~/graphql/auth/queries';
import * as SCENE_NAMES from '~/navigation/scenes';

import styles from './styles';
import type { Props, State } from './types';

const CategoryList = ({ children }) => (
  <View style={styles.categoryListContainer}>
    <View style={styles.categoryButton}>
      <InventoryIcon.Button
        name="menu"
        onPress={() => {}}
        style={styles.icon}
        activeOpacity={0.5}
        size={normalize(30)}
        color={colors.white}
        iconStyle={{ marginRight: 0 }}
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
    const searchValue = state.params && state.params.searchValue;
    const toggleSearch = state.params && state.params.toggleSearch;
    const isSearchActive = state.params && state.params.isSearchActive;
    const isTitleVisible = state.params && state.params.isTitleVisible;
    const toggleViewStyle = state.params && state.params.toggleViewStyle;
    const isListViewStyle = state.params && state.params.isListViewStyle;
    const onChangeSearchField = state.params && state.params.onChangeSearchField;

    return {
      header: isSearchActive
        ? (
          <SearchHeader
            searchValue={searchValue}
            toggleSearch={toggleSearch}
            onChangeSearchField={onChangeSearchField}
          />
        ) : (
          <MainHeader
            toggleSearch={toggleSearch}
            isTitleVisible={isTitleVisible}
            isListViewStyle={isListViewStyle}
            toggleViewStyle={toggleViewStyle}
          />
        ),
    };
  };

  constructor(props: Props) {
    super(props);
    const { navigation } = this.props;

    this.state = {
      searchValue: '',
      isSortByName: true,
      isSearchActive: false,
      isListViewStyle: false,
      currentSelectItem: null,
      isSortModalVisible: false,
      isDeleteModalVisible: false,
    };

    navigation.setParams({
      searchValue: '',
      isSearchActive: false,
      isTitleVisible: false,
      isListViewStyle: false,
      toggleSearch: this.toggleSearch,
      toggleViewStyle: this.toggleViewStyle,
      onChangeSearchField: this.onChangeSearchField,
    });
  }

  renderTab = ({ item, index }: {item: string, index: number}) => (
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

  toggleSearch = () => {
    const { navigation } = this.props;
    const { isSearchActive } = this.state;

    this.setState({
      searchValue: '',
      currentSelectItem: null,
      isSearchActive: !isSearchActive,
    });

    navigation.setParams({
      searchValue: '',
      isSearchActive: !isSearchActive,
    });
  };

  toggleSortMethod = () => {
    const { isSortByName } = this.state;
    this.setState({
      isSortByName: !isSortByName,
    },
    this.toggleSortModalVisible);
  }

  selectItem = (id: number | string) => {
    this.setState({
      currentSelectItem: id,
    });
  }

  onChangeSearchField = (value: string) => {
    const { navigation } = this.props;
    navigation.setParams({
      searchValue: value,
    });
    this.setState({
      searchValue: value.toLowerCase().trim(),
    });
  };

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
      searchValue,
      isSortByName,
      isSearchActive,
      isListViewStyle,
      currentSelectItem,
      isSortModalVisible,
      isDeleteModalVisible,
    } = this.state;
    const { navigation } = this.props;
    const isEmptyList = !true;
    const sortData = isSortByName
      ? constants.data.assets.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
      })
      : constants.data.assets.sort((a, b) => a.purchasePrice - b.purchasePrice);
    const currentUser = constants.users.observer;

    return (
      <Fragment>
        { isEmptyList ? (
          <View>
            <Text style={styles.header}>{constants.headers.items}</Text>
            <Image
              source={assets.noItemsYet}
              style={styles.image}
            />
            <Text style={styles.notItemsText}>{constants.text.notItemsYet}</Text>
            <Button
              isGreen
              customStyle={styles.button}
              title={constants.buttonTitles.addItem}
              onPress={() => navigation.navigate(SCENE_NAMES.QRScanSceneName)}
            />
          </View>
        ) : (
          <ScrollView
            scrollEventThrottle={16}
            onScroll={this.handleScroll}
          >
            <Text style={styles.header}>{constants.headers.items}</Text>
            <CategoryList>
              <FlatList
                horizontal
                data={constants.category}
                renderItem={this.renderTab}
                keyExtractor={this.keyExtractor}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalFlatList}
              />
            </CategoryList>
            {isListViewStyle ? (
              <SwipebleListItem
                data={sortData}
                currentUser={currentUser}
                selectItem={this.selectItem}
                toggleDelModal={this.toggleDelModalVisible}
                extraData={{ currentSelectItem, isSortByName }}
              />
            ) : (
              <FlatList
                data={sortData}
                numColumns={2}
                renderItem={({ item }) => (
                  <Item
                    item={item}
                    currentUser={currentUser}
                    selectItem={this.selectItem}
                    currentSelectItem={currentSelectItem}
                    toggleDelModal={this.toggleDelModalVisible}
                  />
                )}
                keyExtractor={this.keyExtractor}
                extraData={{ currentSelectItem, isSortByName }}
                contentContainerStyle={styles.grid}
              />
            )}
          </ScrollView>
        )}
        {isSearchActive
        && (
        <Search
          searchValue={searchValue}
          items={constants.data.assets}
          toggleSearch={this.toggleSearch}
        />
        )}
        {!isSortModalVisible && !isSearchActive && !isEmptyList && (
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
