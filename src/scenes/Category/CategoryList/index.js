import React, { PureComponent } from 'react';

import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Query } from 'react-apollo';
import SortableList from 'react-native-sortable-list';

import HeaderBackButton from '~/components/HeaderBackButton';
import SortableCategory from '~/components/SortableCategory';

import constants from '~/global/constants';
import * as SCENE_NAMES from '~/navigation/scenes';
import { GET_COMPANY_CATEGORIES } from '~/graphql/categories/queries';

import styles from './styles';

class CategoryList extends PureComponent {
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

  disableScroll = () => {
    this.setState({
      isScrollEnable: false,
    });
  }

  enableScroll = () => {
    this.setState({
      isScrollEnable: true,
    });
  }

  categoryItem = ({ data, active }) => (
    <SortableCategory
      data={data}
      active={active}
      navigateToEdit={this.navigateToEdit}
    />) ;

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

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  render() {
    const { navigation } = this.props;
    const { isScrollEnable } = this.state;

    return (
      <Query query={GET_COMPANY_CATEGORIES}>
        {({ data, loading, error }) => {
          if (loading) return <ActivityIndicator />;
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
                data={categoryList}
                scrollEnabled={false}
                rowActivationTime={500}
                renderRow={this.categoryItem}
                onReleaseRow={this.enableScroll}
                onActivateRow={this.disableScroll}
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

export default CategoryList;
