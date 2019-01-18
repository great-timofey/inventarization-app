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
import { last, includes, intersection } from 'ramda';
import SortableList from 'react-native-sortable-list';
import { compose, graphql, Query } from 'react-apollo';

import Category from '~/components/Category';
import SubCategory from '~/components/SubCategory';

import * as SCENE_NAMES from '~/navigation/scenes';
import { GET_CURRENT_USER_COMPANY_CLIENT } from '~/graphql/auth/queries';
import {
  GET_CATEGORY_ORDER,
  GET_COMPANY_CATEGORIES,
  GET_SELECTED_CATEGORIES,
  GET_COMPANY_CATEGORIES_BY_ID,
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
    const { saveSelectedCategories, current } = this.props;
    const isSubCategoryView = selectedCategory !== '';

    let companyCategories = null;

    if (current != null) {
      const { companies } = current;
      const company = companies[0];
      if (company != null) {
        companyCategories = company.categories;
      }
    }

    let IdList = [];
    let allSubCategoryList = [];

    if (companyCategories && companyCategories.length > 0) {
      allSubCategoryList = companyCategories.filter(x => x.parent !== null).map(x => x.id);
      if (isSubCategoryView) {
        const parent = companyCategories.filter(i => i.name === selectedCategory)[0];

        if (parent.chields && parent.chields.length > 0) {
          IdList = parent.chields.map(x => x.id);
        }
      }
    }
    const isAllCategorySelected = allSubCategoryList.length === saveSelectedCategories.length;

    let isCategorySelect = false;

    if (!isSubCategoryView && data.chields.length > 0 && data.chields) {
      const chieldsList = data.chields.map(x => x.id);
      if (isAllCategorySelected) {
        isCategorySelect = false;
      } else {
        isCategorySelect = !!intersection(chieldsList, saveSelectedCategories).length;
      }
    }

    const isAllSelected = !!saveSelectedCategories.length
     && intersection(saveSelectedCategories, IdList).length === IdList.length;

    let isSubCategorySelect = false;

    if (data && data.id && isSubCategoryView) {
      isSubCategorySelect = includes(data.id.toString(), saveSelectedCategories);
    }

    if (isSubCategoryView) {
      return (
        <SubCategory
          item={data}
          selectCategory={this.selectCategory}
          isSelected={isAllSelected ? false : isSubCategorySelect}
        />
      );
    }
    return (
      <Category
        item={data}
        isSelected={isCategorySelect}
        selectCategory={this.selectCategory}
      />
    );
  };

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  render() {
    const { selectedCategory } = this.state;
    const {
      categoryOrder,
      saveSelectedCategories,
      userCompany: {
        company: {
          id: companyId,
        },
      },
    } = this.props;
    const isSubCategoryView = selectedCategory !== '';

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

          let IdList = [];
          let categoryList = {};
          let subCategoryList = {};
          let allSubCategoryList = [];

          if (companyCategories && companyCategories.length > 0) {
            // $FlowFixMe
            categoryList = { ...companyCategories.filter(i => i.parent === null) };
            allSubCategoryList = companyCategories.filter(x => x.parent !== null).map(x => x.id);

            if (isSubCategoryView) {
              const parent = companyCategories.filter(i => i.name === selectedCategory)[0];

              if (parent.chields && parent.chields.length > 0) {
                subCategoryList = { ...parent.chields };
                IdList = parent.chields.map(x => x.id);
              }
            }
          }

          const isAllCategorySelected = allSubCategoryList.length === saveSelectedCategories.length;
          // eslint-disable-next-line max-len
          const isAllSelected = intersection(saveSelectedCategories, IdList).length === IdList.length;

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
                      chieldsId={IdList}
                      isSelected={isAllSelected}
                      selectCategory={this.selectCategory}
                      item={{ name: `${prefix} ${selectedCategory.toLowerCase()}` }}
                    />
                  </Fragment>
                ) : (
                  <Category
                    allSelectButton
                    selectCategory={() => { }}
                    isSelected={isAllCategorySelected}
                    allSubCategoryList={allSubCategoryList}
                    item={{ name: 'Все категории', icon: 'side-menu-all' }}
                  />
                )
              }
              <SortableList
                scrollEnabled={false}
                sortingEnabled={false}
                renderRow={this.renderItem}
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
  graphql(GET_CURRENT_USER_COMPANY_CLIENT, {
    // $FlowFixMe
    props: ({ data: { userCompany } }) => ({ userCompany }),
  }),
  graphql(GET_CATEGORY_ORDER, {
    // $FlowFixMe
    props: ({ data: { categoryOrder } }) => ({ categoryOrder }),
  }),
  graphql(GET_COMPANY_CATEGORIES, {
    // $FlowFixMe
    props: ({ data: { current } }) => ({ current }),
  }),
  graphql(GET_SELECTED_CATEGORIES, {
    // $FlowFixMe
    props: ({ data: { saveSelectedCategories } }) => ({ saveSelectedCategories }),
  }),
)(CategoryMenu);
