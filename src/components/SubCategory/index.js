// @flow

import React, { PureComponent } from 'react';

import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';

import styles from './styles';
import type { Props, State } from './types';

export class SubCategory extends PureComponent<Props, State> {
  state = {
    isSelect: false,
  };

  render() {
    const { item, isBackButton, selectCategory } = this.props;

    return (
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={isBackButton ? () => selectCategory('') : () => {}}
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
}

export default SubCategory;
