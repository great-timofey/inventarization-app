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
import { SET_SELECTED_CATEGORY } from '~/graphql/categories/mutations';

import styles from './styles';

type Props ={|
  item: Object,
  isSelected?: boolean,
  selectCategory: Function,
|}

export class Category extends PureComponent<Props, {}> {
  selectCategory = () => {
    const {
      item: { name },
      selectCategory,
      allSelectButton,
      allSubCategoryList,
    } = this.props;
    console.log(allSubCategoryList);

    selectCategory(name);

    if (allSelectButton) {
      this.saveSelectedCategory(allSubCategoryList);
    }
  }

  saveSelectedCategory = async (selectedCategory: any) => {
    console.log(selectedCategory);

    const { setSelectedCategory } = this.props;
    await setSelectedCategory({ variables: { selectedCategory } });
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
    name: 'setSelectedCategory',
  }),
  // graphql(GET_SELECTED_CATEGORIES, {
  //   props: ({ data: { selectedCategories } }) => ({ selectedCategories }),
  // }),
)(Category);
