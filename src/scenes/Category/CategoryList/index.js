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
import { compose, graphql, withApollo, Query } from 'react-apollo';

import HeaderBackButton from '~/components/HeaderBackButton';
import SortableCategory from '~/components/SortableCategory';

import constants from '~/global/constants';
import * as SCENE_NAMES from '~/navigation/scenes';
import { SET_CATEGORY_ORDER } from '~/graphql/categories/mutations';
import { GET_COMPANY_CATEGORIES, GET_CATEGORY_ORDER } from '~/graphql/categories/queries';

import styles from './styles';

type Props = {|
  categoryOrder: Array<string>
|}

class CategoryList extends PureComponent<Props, {}> {
  static navigationOptions = ({ navigation }) => ({
    title: constants.headers.categoryList,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.header,
    headerLeft: HeaderBackButton({
      onPress: () => navigation.navigate(SCENE_NAMES.ItemsSceneName),
    }),
  })

  state = {
    isScrollEnable: true,
  }

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
    />);

  navigateToEdit = (id, icon, title, subCategories) => {
    const { navigation } = this.props;

    navigation.navigate(
      SCENE_NAMES.CategoryEdit,
      {
        id,
        icon,
        title,
        subCategories,
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
    const { navigation, categoryOrder } = this.props;

    return (
      <Query query={GET_COMPANY_CATEGORIES}>
        {({ data, loading, error }) => {
          if (loading) { return <ActivityIndicator />; }
          if (error) {
            return (
              <View>
                <Text>{error.message}</Text>
              </View>
            );
          }
          const { categories } = data.current.companies['0'];
          let categoryList = null;

          if (data) {
            categoryList = { ...categories.filter(i => i.parent === null) };
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
  withApollo,
  graphql(SET_CATEGORY_ORDER, {
    name: 'setCategoryOrder',
  }),
  graphql(GET_CATEGORY_ORDER, {
    props: ({ data: { categoryOrder } }) => ({ categoryOrder }),
  }),
)(CategoryList);
