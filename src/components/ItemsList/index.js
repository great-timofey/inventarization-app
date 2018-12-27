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
import Item from '~/components/Item';
import Button from '~/components/Button';
import constants from '~/global/constants';
import * as SCENE_NAMES from '~/navigation/scenes';
import InventoryIcon from '~/assets/InventoryIcon';
import SwipeableList from '~/components/Swipe';

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
  renderItem = ({ item }) => {
    const { userRole, currentSelectItem, selectItem } = this.props;
    return (
      <Item
        item={item}
        selectItem={selectItem}
        currentUserRole={userRole}
        openItem={this.handleOpenItem}
        currentSelectItem={currentSelectItem}
        toggleDelModal={this.toggleDelModalVisible}
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

  handleOpenItem = (item: Object) => {
    const { navigation } = this.props;
    navigation.navigate(SCENE_NAMES.ItemFormSceneName, { item });
  };

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  render() {
    const {
      userId,
      userRole,
      companyId,
      swipeable,
      navigation,
      isSortByName,
      currentSelectItem,
    } = this.props;
    return (
      <Query query={GET_COMPANY_ASSETS} variables={{ companyId }}>
        {({ data, loading, error }) => {
          if (loading) return <ActivityIndicator />;

          if (error) console.log(error);

          const { assets: innerAssets } = data;
          let dataToRender = innerAssets;

          if (userRole === constants.roles.employee || userRole === constants.roles.manager) {
            const resPath = R.lensPath(['responsible', 'id']);
            dataToRender = R.filter(
              asset => R.equals(R.view(resPath, asset), userId)
                && R.equals('in_processing', R.prop('status', asset)),
              innerAssets,
            );
          }

          // console.log(dataToRender);

          return R.isEmpty(dataToRender) ? (
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
                  currentUserRole={userRole}
                  selectItem={this.selectItem}
                  toggleDelModal={this.toggleDelModalVisible}
                  extraData={{ currentSelectItem, isSortByName }}
                />
              ) : (
                <FlatList
                  data={dataToRender}
                  numColumns={2}
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

export default graphql(GET_USER_ID_CLIENT, {
  props: ({ data: { id } }) => ({ userId: id }),
})(ItemsList);
