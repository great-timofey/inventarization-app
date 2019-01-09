// @flow

import React, { PureComponent } from 'react';

import {
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Query } from 'react-apollo';

import Category from '~/components/Category';
import SubCategory from '~/components/SubCategory';

import * as SCENE_NAMES from '~/navigation/scenes';
import { GET_COMPANY_CATEGORIES } from '~/graphql/categories/queries';

import {
  mainNavigation,
  setIsSideMenuOpen,
} from '~/global';
import type { Categories } from '~/types';

import styles from './styles';
import type { Props, State } from './types';

export class CategoryMenu extends PureComponent<Props, State> {
  state ={
    selectedCategory: '',
  }

  selectCategory = (categoryName: string) => {
    this.setState({
      selectedCategory: categoryName,
    });
  }

  renderItem = (item: Object, isSubCategoryView: boolean) => {
    if (isSubCategoryView) {
      return <SubCategory item={item} selectCategory={this.selectCategory} />;
    }
    return <Category item={item} selectCategory={this.selectCategory} />;
  }

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  render() {
    const { selectedCategory } = this.state;

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

          let companyCategories: ?Categories;
          if (data != null) {
            const { current } = data;
            if (current != null) {
              const { companies } = current;
              const company = companies['0'];
              if (company != null) {
                companyCategories = company.categories;
              }
            }
          }

          let categoryList = [];
          if (companyCategories && companyCategories.length > 0) {
            categoryList = companyCategories.filter(i => i.parent === null);
          }

          let subCategoryList = [];

          if (companyCategories && selectedCategory !== '') {
            subCategoryList = [
              ...companyCategories.filter(i => i.name === selectedCategory)[0].chields,
            ];
          }
          const isSubCategoryView = selectedCategory !== '';

          return (
            <ScrollView
              scrollsToTop={false}
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              {isSubCategoryView
                ? (
                  <SubCategory
                    isBackButton
                    selectCategory={this.selectCategory}
                    item={{ name: selectedCategory, icon: 'ios-arrow-back' }}
                  />
                ) : (
                  <Category
                    selectCategory={() => {}}
                    item={{ name: 'Все категории', icon: 'side-menu-all' }}
                  />
                )
            }
              <FlatList
                scrollEnabled={false}
                extraData={selectedCategory}
                keyExtractor={this.keyExtractor}
                data={isSubCategoryView ? subCategoryList : categoryList}
                renderItem={({ item }) => this.renderItem(item, isSubCategoryView)}
              />
              { !isSubCategoryView && (
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
