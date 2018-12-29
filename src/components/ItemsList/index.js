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

import R from 'ramda';
import { Query, graphql } from 'react-apollo';
import LinearGradient from 'react-native-linear-gradient';

import assets from '~/global/assets';
import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import { GET_USER_ID_CLIENT } from '~/graphql/auth/queries';
import { GET_COMPANY_ASSETS } from '~/graphql/assets/queries';
import ItemComponent from '~/components/Item';
import Button from '~/components/Button';
import constants from '~/global/constants';
import * as SCENE_NAMES from '~/navigation/scenes';
import InventoryIcon from '~/assets/InventoryIcon';
import SwipeableList from '~/components/Swipe';

import type { Item } from '~/global/types';
import type { Props } from './types';

import styles from './styles';

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

class ItemsList extends PureComponent<Props> {
  renderItem = ({ item }: { item: Item }) => {
    const { userRole, currentSelectItem, selectItem, toggleDelModalVisible } = this.props;
    const showRemoveButton = userRole !== constants.roles.manager;

    return (
      <ItemComponent
        item={item}
        selectItem={selectItem}
        openItem={this.handleOpenItem}
        showRemoveButton={showRemoveButton}
        currentSelectItem={currentSelectItem}
        toggleDelModal={toggleDelModalVisible}
        showMenuButton={userRole !== constants.roles.observer}
      />
    );
  };

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

  render() {
    const {
      userId,
      userRole,
      companyId,
      swipeable,
      navigation,
      selectItem,
      isSortByName,
      currentSelectItem,
      handleShowSortButton,
      toggleDelModalVisible,
    } = this.props;
    return (
      <Query query={GET_COMPANY_ASSETS} variables={{ companyId }}>
        {({ data, loading, error }) => {
          if (loading) return <ActivityIndicator />;

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

          if (userRole === constants.roles.employee || userRole === constants.roles.manager) {
            const resPath = R.lensPath(['responsible', 'id']);
            dataToRender = R.filter(
              asset => R.equals(R.view(resPath, asset), userId)
                && R.equals('on_processing', R.prop('status', asset)),
              innerAssets,
            );
          }

          const dataToRenderIsEmpty = R.isEmpty(dataToRender);
          if (dataToRenderIsEmpty) {
            handleShowSortButton(false);
          } else {
            handleShowSortButton(true);
          }

          // console.log(dataToRender);
          return dataToRenderIsEmpty ? (
            <View>
              <Text style={styles.header}>{constants.headers.items}</Text>
              <Image source={assets.noItemsYet} style={styles.image} />
              <Text style={styles.notItemsText}>{constants.text.notItemsYet}</Text>
              <Button
                isGreen
                customStyle={styles.button}
                title={constants.buttonTitles.addItem}
                onPress={
                  userRole === constants.roles.admin
                    ? () => navigation.navigate(SCENE_NAMES.QRScanSceneName)
                    : () => {}
                }
              />
            </View>
          ) : (
            <ScrollView scrollEventThrottle={16} onScroll={this.handleScroll}>
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
              {swipeable ? (
                <SwipeableList
                  data={dataToRender}
                  selectItem={selectItem}
                  currentUserRole={userRole}
                  openItem={this.handleOpenItem}
                  toggleDelModal={toggleDelModalVisible}
                  extraData={{ currentSelectItem, isSortByName }}
                />
              ) : (
                <FlatList
                  numColumns={2}
                  data={dataToRender}
                  renderItem={this.renderItem}
                  keyExtractor={this.keyExtractor}
                  contentContainerStyle={styles.grid}
                  extraData={{ currentSelectItem, isSortByName }}
                />
              )}
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}

//  $FlowFixMe
export default graphql(GET_USER_ID_CLIENT, { props: ({ data: { id } }) => ({ userId: id }) })(
  ItemsList,
);
