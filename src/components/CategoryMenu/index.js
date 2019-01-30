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
import { includes, findIndex, intersection } from 'ramda';
import SortableList from 'react-native-sortable-list';
import { compose, graphql, Query } from 'react-apollo';

import Category from '~/components/Category';
import SubCategory from '~/components/SubCategory';

import { getPrefix } from '~/global/utils';
import * as SCENE_NAMES from '~/navigation/scenes';
import { GET_CURRENT_USER_COMPANY_CLIENT } from '~/graphql/auth/queries';
import {
  GET_CATEGORY_ORDER,
  GET_COMPANY_CATEGORIES,
  GET_SELECTED_CATEGORIES,
  GET_COMPANY_CATEGORIES_BY_ID,
} from '~/graphql/categories/queries';

import constants from '~/global/constants';
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

    let companyCategories = [];

    if (current != null) {
      const { companies } = current;
      const company = companies[0];
      if (company != null) {
        companyCategories = company.categories;
      }
    }

    let chieldsIdList = [];

    if (companyCategories
      && data.chields
      && data.chields.length > 0
      && companyCategories.length > 0
    ) {
      chieldsIdList = data.chields.map(x => x.id);
    } else if (isSubCategoryView) {
      const parentIndex = findIndex(el => el.name === selectedCategory, companyCategories);
      if (companyCategories[parentIndex] && companyCategories[parentIndex].chields) {
        chieldsIdList = companyCategories[parentIndex].chields.map(el => el.id);
      }
    }

    let isCategorySelect = false;
    let isSubCategorySelect = false;

    const isAllCategoriesSelected = companyCategories.length === saveSelectedCategories.length;
    // eslint-disable-next-line max-len
    const isAllSubCategoriesSelected = intersection(saveSelectedCategories, chieldsIdList).length === chieldsIdList.length;

    if (!isSubCategoryView) {
      if (isAllCategoriesSelected) {
        isCategorySelect = false;
      } else if (data.chields && data.chields.length === 0) {
        isCategorySelect = includes(data.id, saveSelectedCategories);
      } else if (data.chields && data.chields.length > 0) {
        isCategorySelect = !!intersection(chieldsIdList, saveSelectedCategories).length;
      }
    }

    if (isSubCategoryView && data && data.id) {
      isSubCategorySelect = includes(data.id, saveSelectedCategories);
    }

    if (isSubCategoryView) {
      return (
        <SubCategory
          item={data}
          selectCategory={this.selectCategory}
          isSelected={isAllSubCategoriesSelected ? false : isSubCategorySelect}
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
          let allCategoriesList = [];
          let defaultCategoryId = 0;

          if (companyCategories && companyCategories.length > 0) {
            // $FlowFixMe
            categoryList = { ...companyCategories.filter(i => i.parent === null) };
            allCategoriesList = companyCategories.map(x => x.id);
            if (isSubCategoryView) {
              const parent = companyCategories.filter(i => i.name === selectedCategory)[0];

              if (parent.chields && parent.chields.length > 0) {
                subCategoryList = { ...parent.chields };
                IdList = parent.chields.map(x => x.id);
              }
            }
            const defaultCategoryIndex = findIndex(el => el.isDefault === true, companyCategories);
            if (defaultCategoryIndex !== -1) {
              defaultCategoryId = companyCategories[defaultCategoryIndex].id;
            }
          }

          const isAllCategorySelected = allCategoriesList.length === saveSelectedCategories.length;
          // eslint-disable-next-line max-len
          const isAllSelected = intersection(saveSelectedCategories, IdList).length === IdList.length;

          const isSelectedWithoutCategory = includes(defaultCategoryId, saveSelectedCategories)
            && saveSelectedCategories.length === 1;

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
                      item={{ name: `${getPrefix(selectedCategory)} ${selectedCategory.toLowerCase()}` }}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <Category
                      allSelectButton
                      selectCategory={() => {}}
                      isSelected={isAllCategorySelected}
                      allSubCategoryList={allCategoriesList}
                      item={constants.generalCategories.allCategories}
                    />
                    <Category
                      defaultCategoryId={defaultCategoryId}
                      isSelected={isSelectedWithoutCategory}
                      item={constants.generalCategories.withoutCategories}
                    />
                  </Fragment>

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
                    {constants.buttonTitles.editCategory}
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
