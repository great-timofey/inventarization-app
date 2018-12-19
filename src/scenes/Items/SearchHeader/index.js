//  @flow

import React from 'react';
import { View, TextInput } from 'react-native';

import IconButton from '~/components/IconButton';

import colors from '~/global/colors';
import constants from '~/global/constants';

import styles from './styles';
import type { Props } from './types';

const SearchHeader = ({ toggleSearch, onChangeSearchField }: Props) => (
  <View style={styles.headerContainer}>
    <TextInput
      autoFocus
      autoCorrect={false}
      style={styles.searchInput}
      placeholderTextColor={colors.placeholder}
      placeholder={constants.placeHolders.inputHeader}
      onChangeText={text => onChangeSearchField(text)}
    />
    <IconButton
      size={50}
      iconName="ios-close"
      customContStyle={{
        borderRadius: 0,
        backgroundColor: colors.transparent,
      }}
      customIconStyle={{ color: colors.blue }}
      customPosition={{ top: 5 }}
      onPress={toggleSearch}
    />
  </View>
);
export default SearchHeader;
