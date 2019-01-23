// @flow

import React, { PureComponent } from 'react';

import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { compose, graphql } from 'react-apollo';
import CustomIcon from '~/assets/InventoryIcon';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import { setIsSideMenuOpen } from '~/global';
import { SET_SELECTED_CATEGORY } from '~/graphql/categories/mutations';

import styles from './styles';
import type { Props } from './types';

export class Category extends PureComponent<Props, {}> {
  selectCategory = () => {
    const {
      item,
      selectCategory,
      allSelectButton,
      defaultCategoryId,
      allSubCategoryList,
    } = this.props;
    console.log(defaultCategoryId);

    if (item.chields && item.chields.length > 0) {
      selectCategory(item.name);
    } else if (item.chields && item.chields.length === 0) {
      this.saveSelectedCategories([item.id]);
    }

    if (allSelectButton) {
      this.saveSelectedCategories(allSubCategoryList);
      setIsSideMenuOpen(false);
    }

    if (defaultCategoryId) {
      this.saveSelectedCategories(defaultCategoryId);
      setIsSideMenuOpen(false);
    }
  }

  saveSelectedCategories = async (selectedCategories: any) => {
    const { setSelectedCategories } = this.props;
    await setSelectedCategories({ variables: { selectedCategories } });
  }

  render() {
    const { item, isSelected } = this.props;

    if (item != null) {
      return (
        <TouchableOpacity
          onPress={this.selectCategory}
          style={[styles.menuContainer, isSelected && styles.selectedCategory]}
        >
          <CustomIcon
            name={item.icon}
            size={normalize(25)}
            color={colors.white}
            style={styles.categoryIcon}
            backgroundColor={colors.transparent}
          />
          <View style={styles.wrapper}>
            <Text style={styles.text}>
              {item.name}
            </Text>
            <Icon
              style={styles.arrow}
              color={colors.white}
              size={normalize(25)}
              name="ios-arrow-forward"
              backgroundColor={colors.transparent}
            />
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }
}

export default compose(
  graphql(SET_SELECTED_CATEGORY, {
    name: 'setSelectedCategories',
  }),
)(Category);
