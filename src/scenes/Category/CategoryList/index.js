import React, { PureComponent } from 'react';

import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import SortableList from 'react-native-sortable-list';
import { compose, graphql, Query } from 'react-apollo';

import HeaderBackButton from '~/components/HeaderBackButton';
import SortableCategory from '~/components/SortableCategory';

import constants from '~/global/constants';
import type { Categories } from '~/types';
import { setIsSideMenuOpen } from '~/global';
import * as SCENE_NAMES from '~/navigation/scenes';
import { SET_CATEGORY_ORDER } from '~/graphql/categories/mutations';
import { GET_CURRENT_USER_COMPANY_CLIENT } from '~/graphql/auth/queries';
import { GET_COMPANY_CATEGORIES_BY_ID, GET_CATEGORY_ORDER } from '~/graphql/categories/queries';

import styles from './styles';

type Props = {|
  categoryOrder: Array<string>
|}

class CategoryList extends PureComponent<Props, {}> {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const openSideMenu = state.params && state.params.openSideMenu;

    return ({
      title: constants.headers.categoryList,
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.header,
      headerLeft: HeaderBackButton({
        onPress: openSideMenu,
      }),
    });
  }

  constructor(props) {
    super(props);
    const { navigation } = this.props;

    this.state = {
      isScrollEnable: true,
    };

    navigation.setParams({
      openSideMenu: this.openSideMenu,
    });
  }

  openSideMenu = () => {
    const { navigation } = this.props;
    setIsSideMenuOpen(true);
    navigation.navigate(SCENE_NAMES.ItemsSceneName);
  };

  toogleParentScroll = () => {
    const { isScrollEnable } = this.state;
    this.setState({
      isScrollEnable: !isScrollEnable,
    });
  }

  categoryItem = ({ data, active }) => (
    <SortableCategory
      data={data}
      active={active}
      navigateToEdit={this.navigateToEdit}
    />
  );

  navigateToEdit = (id, icon, title) => {
    const { navigation } = this.props;

    navigation.navigate(
      SCENE_NAMES.CategoryEdit,
      {
        id,
        icon,
        title,
      },
    );
  }

  reorder = async (categoryOrder) => {
    const { setCategoryOrder } = this.props;
    await setCategoryOrder({ variables: { categoryOrder } });
  }

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  render() {
    const { isScrollEnable } = this.state;
    const {
      navigation,
      categoryOrder,
      userCompany: {
        company: {
          id: companyId,
        },
      },
    } = this.props;

    return (
      <Query query={GET_COMPANY_CATEGORIES_BY_ID} variables={{ companyId }}>
        {({ data, loading, error }) => {
          if (loading) { return <ActivityIndicator />; }
          if (error) {
            return (
              <View>
                <Text>{error.message}</Text>
              </View>
            );
          }

          let companyCategories: ?Categories;
          if (data != null) {
            companyCategories = data.categories;
          }

          let categoryList = null;

          if (data) {
            categoryList = { ...companyCategories.filter(i => i.parent === null) };
          }

          return (
            <ScrollView style={styles.container} scrollEnabled={isScrollEnable}>
              <StatusBar barStyle="dark-content" />
              <SortableList
                scrollEnabled={false}
                rowActivationTime={300}
                data={categoryList || null}
                renderRow={this.categoryItem}
                onReleaseRow={this.toogleParentScroll}
                onActivateRow={this.toogleParentScroll}
                onChangeOrder={order => this.reorder(order)}
                order={categoryOrder.length > 0 ? categoryOrder : null}
              />
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => navigation.navigate(SCENE_NAMES.CategoryEdit)}
              >
                <Text style={styles.addButtonText}>
                  {constants.buttonTitles.addCategory}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}

export default compose(
  graphql(SET_CATEGORY_ORDER, {
    name: 'setCategoryOrder',
  }),
  graphql(GET_CATEGORY_ORDER, {
    props: ({ data: { categoryOrder } }) => ({ categoryOrder }),
  }),
  graphql(GET_CURRENT_USER_COMPANY_CLIENT, {
    // $FlowFixMe
    props: ({ data: { userCompany } }) => ({ userCompany }),
  }),
)(CategoryList);
