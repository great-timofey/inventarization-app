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
import { SET_SELECTED_CATEGORY } from '~/graphql/categories/mutations';

import styles from './styles';
import type { Props, State } from './types';

export class SubCategory extends PureComponent<Props, State> {
  state = {
    isSelect: false,
  };

  saveSelectedCategory = async (selectedCategory: any) => {
    const { setSelectedCategory } = this.props;
    await setSelectedCategory({ variables: { selectedCategory } });
  }

  selectCategory = () => {
    const { isSelect } = this.state;
    const { isBackButton, selectCategory, item: { id } } = this.props;

    if (isBackButton) {
      selectCategory('');
    }

    this.setState({
      isSelect: !isSelect,
    });

    this.saveSelectedCategory(id).catch(error => console.log('An error', error));
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
)(SubCategory);
