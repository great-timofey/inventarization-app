// @flow

import React, { PureComponent } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { compose, graphql } from 'react-apollo';

import Icon from 'react-native-vector-icons/Ionicons';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import { setIsSideMenuOpen } from '~/global';
import { SET_SELECTED_CATEGORY } from '~/graphql/categories/mutations';
import { GET_SELECTED_CATEGORIES } from '~/graphql/categories/queries';

import styles from './styles';
import type { Props, State } from './types';

export class SubCategory extends PureComponent<Props, State> {
  saveSelectedCategories = async (selectedCategories: any) => {
    const { setSelectedCategories } = this.props;
    await setSelectedCategories({ variables: { selectedCategories } });
  }

  selectCategory = () => {
    const {
      chieldsId,
      item: { id },
      isBackButton,
      selectCategory,
    } = this.props;

    if (isBackButton) {
      selectCategory('');
    } else if (chieldsId) {
      if (chieldsId.length > 0) {
        this.saveSelectedCategories(chieldsId);
        setIsSideMenuOpen(false);
      }
    } else {
      this.saveSelectedCategories(id.split());
    }
  }

  render() {
    const { item, isBackButton, isSelected } = this.props;

    if (item != null) {
      return (
        <TouchableOpacity
          onPress={this.selectCategory}
          style={[styles.menuContainer, isSelected && styles.selectedSubCategory]}
        >
          {isBackButton && (
            <Icon
              size={normalize(25)}
              name="ios-arrow-back"
              color={colors.blueBorder}
              style={styles.subCategoryIcon}
              backgroundColor={colors.transparent}
            />
          )}
          <View style={[styles.wrapper, isBackButton && styles.backButtonWrapper]}>
            <Text style={[
              styles.text,
              isBackButton && styles.backButtonText,
              isSelected && styles.selectedText]}
            >
              {item.name}
            </Text>
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
  graphql(GET_SELECTED_CATEGORIES, {
    // $FlowFixMe
    props: ({ data: { saveSelectedCategories } }) => ({ saveSelectedCategories }),
  }),
)(SubCategory);
