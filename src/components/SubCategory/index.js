// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { compose, graphql } from 'react-apollo';

import Icon from 'react-native-vector-icons/Ionicons';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import { SET_SELECTED_CATEGORY } from '~/graphql/categories/mutations';
import { GET_SELECTED_CATEGORIES } from '~/graphql/categories/queries';

import styles from './styles';
import type { Props, State } from './types';

export class SubCategory extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { isSelect } = this.props;
    this.state = {
      isSelect,
    };
  }

  saveSelectedCategory = async (selectedCategory: any) => {
    const { setSelectedCategory } = this.props;
    await setSelectedCategory({ variables: { selectedCategory } });
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
        this.saveSelectedCategory(chieldsId);
      }
    } else {
      this.saveSelectedCategory(id.split());
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.isSelect !== this.props.isSelect) {
      return true;
    }
    return !false;
  }

  componentDidUpdate(prevProps: Props) {
    const { isSelect } = this.props;
    if (prevProps.isSelect !== isSelect) {
      this.setState = ({
        isSelect,
      });
    }
  }

  render() {
    const { isSelect } = this.state;
    const { item, isBackButton } = this.props;

    if (item != null) {
      return (
        <TouchableOpacity
          onPress={this.selectCategory}
          style={[styles.menuContainer, isSelect && styles.select]}
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
            <Text style={[styles.text, isBackButton && styles.backButtonText]}>
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
    name: 'setSelectedCategory',
  }),
  graphql(GET_SELECTED_CATEGORIES, {
    props: ({ data: { selectedCategories } }) => ({ selectedCategories }),
  }),
)(SubCategory);
