//  @flow

import React from 'react';
import { View, TextInput } from 'react-native';

import IconButton from '~/components/IconButton';

import colors from '~/global/colors';
import constants from '~/global/constants';

import styles from './styles';
import type { Props } from './types';

const SearchHeader = ({ toggleSearch, onChangeSearchField, searchValue }: Props) => (
  <View style={styles.headerContainer}>
    <TextInput
      autoFocus
      autoCorrect={false}
      value={searchValue}
      returnKeyType="search"
      onSubmitEditing={toggleSearch}
      style={styles.searchInput}
      placeholderTextColor={colors.placeholder}
      placeholder={constants.placeHolders.inputHeader}
      onChangeText={text => onChangeSearchField(text)}
    />
    <IconButton
      size={50}
      iconName="ios-close"
      onPress={toggleSearch}
      customPosition={styles.customPosition}
      customContStyle={styles.customContStyle}
      customIconStyle={styles.customIconStyle}
    />
  </View>
);
export default SearchHeader;
