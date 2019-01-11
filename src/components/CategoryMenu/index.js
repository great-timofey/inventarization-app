// @flow

import React, { Fragment, PureComponent } from 'react';

import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
// $FlowFixMe
import { last, includes } from 'ramda';
import SortableList from 'react-native-sortable-list';
import { compose, graphql, Query } from 'react-apollo';

import Category from '~/components/Category';
import SubCategory from '~/components/SubCategory';

import * as SCENE_NAMES from '~/navigation/scenes';
import {
  GET_CATEGORY_ORDER,
  GET_COMPANY_CATEGORIES,
  GET_SELECTED_CATEGORIES,
} from '~/graphql/categories/queries';

import {
  mainNavigation,
  setIsSideMenuOpen,
} from '~/global';
import type { Categories } from '~/types';

import styles from './styles';
import type { Props, State } from './types';

class CategoryMenu extends PureComponent<Props, State> {
  state = {
    selectedCategory: '',
  };

  selectCategory = (categoryName: string) => {
    this.setState({
      selectedCategory: categoryName,
    });
  };

  renderItem = ({ data }: Object) => {
    const { selectedCategory } = this.state;
    const { selectedCategories } = this.props;
    const isSubCategoryView = selectedCategory !== '';
    let isSelect = false;

    if (data && data.id && isSubCategoryView) {
      isSelect = includes(data.id.toString(), selectedCategories);
    }

    if (isSubCategoryView) {
      return <SubCategory item={data} isSelect={isSelect} selectCategory={this.selectCategory} />;
    }
    return <Category item={data} selectCategory={this.selectCategory} />;
  };

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  render() {
    const { selectedCategory } = this.state;
    const { categoryOrder } = this.props;
    const isSubCategoryView = selectedCategory !== '';

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

          let companyCategories: ?Categories;
          if (data != null) {
            const { current } = data;
            if (current != null) {
              const { companies } = current;
              const company = companies[0];
              if (company != null) {
                companyCategories = company.categories;
              }
            }
          }

          let categoryList = {};
          let subCategoryList = {};
          let subCategoryIdList = [];

          if (companyCategories && companyCategories.length > 0) {
            // $FlowFixMe
            categoryList = { ...companyCategories.filter(i => i.parent === null) };

            if (isSubCategoryView) {
              const parent = companyCategories.filter(i => i.name === selectedCategory)[0];

              if (parent.chields.length > 0) {
                subCategoryList = { ...parent.chields };
                subCategoryIdList = parent.chields.map(x => x.id);
              }
            }
          }

          let prefix = '';

          if (includes(last(selectedCategory), ['ь', 'а'])) {
            prefix = 'Вся';
          } else if (includes(last(selectedCategory), ['ы', 'я', 'и'])) {
            prefix = 'Все';
          } else {
            prefix = 'Весь';
          }

          return (
            <ScrollView
              scrollsToTop={false}
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              {isSubCategoryView
                ? (
                  <Fragment>
                    <SubCategory
                      isBackButton
                      selectCategory={this.selectCategory}
                      item={{ name: selectedCategory, icon: 'ios-arrow-back' }}
                    />
                    <SubCategory
                      chieldsId={subCategoryIdList}
                      selectCategory={this.selectCategory}
                      item={{ name: `${prefix} ${selectedCategory.toLowerCase()}` }}
                    />
                  </Fragment>
                ) : (
                  <Category
                    selectCategory={() => {}}
                    item={{ name: 'Все категории', icon: 'side-menu-all' }}
                  />
                )
            }
              <SortableList
                scrollEnabled={false}
                sortingEnabled={false}
                renderRow={this.renderItem}
                order={categoryOrder.length > 0 ? categoryOrder : null}
                data={isSubCategoryView ? subCategoryList : categoryList}
              />
              {!isSubCategoryView && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setIsSideMenuOpen(false);
                  mainNavigation.navigate(SCENE_NAMES.CategoryList);
                }}
              >
                <Text style={styles.editButtonText}>
                  Редактировать категории
                </Text>
              </TouchableOpacity>
              )}
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}

export default compose(
  graphql(GET_CATEGORY_ORDER, {
    // $FlowFixMe
    props: ({ data: { categoryOrder } }) => ({ categoryOrder }),
  }),
  graphql(GET_SELECTED_CATEGORIES, {
    // $FlowFixMe
    props: ({ data: { selectedCategories } }) => ({ selectedCategories }),
  }),
)(CategoryMenu);
