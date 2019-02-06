// @flow

import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

//  $FlowFixMe
import { pluck, filter, includes } from 'ramda';
import { Query, graphql, compose } from 'react-apollo';
import LinearGradient from 'react-native-linear-gradient';

import Button from '~/components/Button';
import ListItem from '~/components/ListItem';
import ItemComponent from '~/components/Item';
import SwipeableList from '~/components/Swipe';

import assets from '~/global/assets';
import colors from '~/global/colors';
import constants from '~/global/constants';
import { normalize } from '~/global/utils';
import { isAndroid } from '~/global/device';
import { setIsSideMenuOpen } from '~/global';

import * as SCENE_NAMES from '~/navigation/scenes';
import InventoryIcon from '~/assets/InventoryIcon';
import * as ASSETS_QUERIES from '~/graphql/assets/queries';
import * as CATEGORIES_QUERIES from '~/graphql/categories/queries';
import * as AUTH_QUERIES from '~/graphql/auth/queries';
import * as PLACES_QUERIES from '~/graphql/places/queries';

import type { Item } from '~/global/types';
import type { Props } from './types';

import styles from './styles';

const CategoryList = ({ children, openSideMenu }) => (
  <View style={styles.categoryListContainer}>
    <View style={styles.categoryButton}>
      <InventoryIcon.Button
        name="menu"
        onPress={openSideMenu}
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

class ItemsList extends PureComponent<Props> {
  renderItem = ({ item }: { item: Item }) => {
    const {
      userId,
      userRole,
      selectItem,
      currentUser,
      getItemPosition,
      currentSelectItem,
      toggleDelModalVisible,
    } = this.props;

    const isUserAdmin = userRole === constants.roles.admin;
    const isUserManager = userRole === constants.roles.manager;
    const isUserEmployee = userRole === constants.roles.employee;
    const isUserCreator = item && item.creator && item.creator.id === userId;
    const isItemInProcessing = item.status === constants.assetStatuses.onProcessing;

    let showRemoveButton = false;
    let showMenuButton = false;

    if (isUserAdmin) {
      showRemoveButton = true;
      showMenuButton = true;
    } else if (isUserEmployee && (isUserCreator && isItemInProcessing)) {
      showRemoveButton = true;
      showMenuButton = true;
    } else if (isUserManager) {
      if (currentUser) {
        const { createdPlaces = [], responsiblePlaces = [] } = currentUser;
        const userPlaces = [...createdPlaces, ...responsiblePlaces];
        const placesIds = pluck('id', userPlaces);
        const isItemInResponsiblePlaces = includes(item.place && item.place.id, placesIds);
        const isUserResponsible = item && item.responsible && item.responsible.id === userId;
        const isItemWithoutPlace = item && !item.place;

        //  eslint-disable-next-line
        showMenuButton =
          isItemInResponsiblePlaces || isUserResponsible || (isUserCreator && isItemWithoutPlace);
        showRemoveButton = showMenuButton;
      }
    }

    return (
      <ItemComponent
        item={item}
        userId={userId}
        selectItem={selectItem}
        openItem={this.handleOpenItem}
        showMenuButton={showMenuButton}
        getItemPosition={getItemPosition}
        //  $FlowFixMe
        showRemoveButton={showRemoveButton}
        currentSelectItem={currentSelectItem}
        toggleDelModal={toggleDelModalVisible}
        parentScrollViewRef={this.scrollViewRef}
      />
    );
  };

  renderAndroidRow = ({ item }) => {
    const { getItemPosition } = this.props;
    return (
      <ListItem
        item={item}
        openItem={this.handleOpenItem}
        getItemPosition={getItemPosition}
        parentScrollViewRef={this.scrollViewRef}
      />
    );
  }

  renderTab = ({ item, index }: { item: string, index: number }) => (
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

  openSideMenu = () => {
    setIsSideMenuOpen(true);
  };

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

  handleOpenItem = (item: Object, inEditMode: boolean) => {
    const { navigation } = this.props;
    navigation.navigate(SCENE_NAMES.ItemFormSceneName, { item, inEditMode });
  };

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  scrollViewRef: any;

  itemRef: any;

  render() {
    const {
      userId,
      current,
      placeId,
      userRole,
      companyId,
      swipeable,
      navigation,
      selectItem,
      currentUser,
      isSortByName,
      getItemPosition,
      currentSelectItem,
      handleShowSortButton,
      isMarginBottomActive,
      toggleDelModalVisible,
      saveSelectedCategories,
      isAndroidActionsModalVisible,
    } = this.props;

    return (
      <Query query={ASSETS_QUERIES.GET_COMPANY_ASSETS} variables={{ companyId }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error) {
            return (
              <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>{error.message}</Text>
              </View>
            );
          }
          // $FlowFixMe
          const { assets: innerAssets } = data;
          let dataToRender = innerAssets;

          const isUserEmployee = userRole === constants.roles.employee;
          const isUserManager = userRole === constants.roles.manager;

          if (isUserEmployee) {
            if (innerAssets) {
              dataToRender = innerAssets.filter(
                asset => (asset.creator
                    && asset.creator.id === userId
                    && asset.status === constants.assetStatuses.onProcessing)
                  || (asset.responsible && asset.responsible.id === userId),
              );
            }
          }

          if (isUserManager) {
            if (currentUser) {
              const { createdPlaces = [], responsiblePlaces = [] } = currentUser;
              const userPlaces = [...createdPlaces, ...responsiblePlaces];

              const placesIds = pluck('id', userPlaces);

              if (innerAssets) {
                const assetsOfNotResponsiblePlaces = filter(
                  asset => !includes(asset.place && asset.place.id, placesIds)
                    && (asset.responsible && asset.responsible.id === userId),
                  innerAssets,
                );
                dataToRender = filter(
                  asset => includes(asset.place && asset.place.id, placesIds)
                    || (asset.creator && asset.creator.id === userId && !asset.place),
                  innerAssets,
                ).concat(assetsOfNotResponsiblePlaces);
              }
            }
          }

          let companyCategories = [];

          if (current != null) {
            const { companies } = current;
            const company = companies[0];
            if (company != null) {
              companyCategories = company.categories;
            }
          }

          let categoryTabData = [];

          saveSelectedCategories.forEach((e) => {
            const match = companyCategories.find(x => x.id === e);
            if (match) {
              categoryTabData = [...categoryTabData, match.name];
            }
          });

          if (saveSelectedCategories.length > 0) {
            dataToRender = dataToRender.filter(el => el.category
              && el.category.id
              && includes(el.category.id, saveSelectedCategories));
          }

          if (placeId) {
            dataToRender = dataToRender.filter(el => el.place
            && el.place.id
            && includes(el.place.id, placeId));
          }

          const dataToRenderIsEmpty = dataToRender.length === 0;
          const isSortButtonShow = dataToRender.length > 1;
          if (isSortButtonShow) {
            handleShowSortButton(true);
          } else {
            handleShowSortButton(false);
          }

          return dataToRenderIsEmpty ? (
            <View>
              {placeId ? null : <Text style={styles.header}>{constants.headers.items}</Text>}
              <Image
                source={assets.noItemsYet}
                style={[styles.image, placeId && styles.imagePlace]}
              />
              <Text style={styles.notItemsText}>{constants.text.notItemsYet}</Text>
              <Button
                isGreen
                customStyle={styles.button}
                title={constants.buttonTitles.addItem}
                onPress={
                  userRole !== constants.roles.observer
                    ? () => navigation.navigate(SCENE_NAMES.QRScanSceneName)
                    : () => {}
                }
              />
            </View>
          ) : (
            <ScrollView
              scrollEventThrottle={16}
              onScroll={this.handleScroll}
              overScrollMode="never"
              ref={(ref) => { this.scrollViewRef = ref; }}
              scrollEnabled={!isAndroidActionsModalVisible}
            >
              {placeId ? null : <Text style={styles.header}>{constants.headers.items}</Text>}
              <CategoryList openSideMenu={this.openSideMenu}>
                <FlatList
                  horizontal
                  data={categoryTabData}
                  renderItem={this.renderTab}
                  keyExtractor={this.keyExtractor}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalFlatList}
                />
              </CategoryList>
              {swipeable && !isAndroid && (
                <SwipeableList
                  userId={userId}
                  data={dataToRender}
                  userRole={userRole}
                  selectItem={selectItem}
                  openItem={this.handleOpenItem}
                  getItemPosition={getItemPosition}
                  toggleDelModal={toggleDelModalVisible}
                  parentScrollViewRef={this.scrollViewRef}
                  extraData={{ currentSelectItem, isSortByName }}
                />
              )}
              {swipeable && isAndroid && (
                <FlatList
                  data={dataToRender}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderAndroidRow}
                  scrollEnabled={!isAndroidActionsModalVisible}
                  extraData={{ currentSelectItem, isSortByName, isAndroidActionsModalVisible }}
                />
              )}
              {!swipeable && (
                <FlatList
                  numColumns={2}
                  data={dataToRender}
                  renderItem={this.renderItem}
                  keyExtractor={this.keyExtractor}
                  contentContainerStyle={[
                    styles.grid,
                    isMarginBottomActive && { marginBottom: 200 },
                  ]}
                  scrollEnabled={!isAndroidActionsModalVisible}
                  extraData={{ currentSelectItem, isSortByName, isAndroidActionsModalVisible }}
                />
              )}
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}

export default compose(
  //  $FlowFixMe
  graphql(AUTH_QUERIES.GET_USER_ID_CLIENT, { props: ({ data: { id } }) => ({ userId: id }) }),
  graphql(CATEGORIES_QUERIES.GET_SELECTED_CATEGORIES, {
    // $FlowFixMe
    props: ({ data: { saveSelectedCategories } }) => ({ saveSelectedCategories }),
  }),
  graphql(CATEGORIES_QUERIES.GET_COMPANY_CATEGORIES, {
    // $FlowFixMe
    props: ({ data: { current } }) => ({ current }),
  }),
  /*  eslint-disable */
  //  $FlowFixMe
  graphql(PLACES_QUERIES.GET_CURRENT_USER_PLACES, { props: ({ data: { current } }) => ({ currentUser: current }) })
  /*  eslint-enable */
)(ItemsList);
