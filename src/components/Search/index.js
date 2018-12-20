//  @flow
import React, { PureComponent } from 'react';
import { Text, FlatList, TouchableOpacity } from 'react-native';

import { BlurView } from 'react-native-blur';

import constants from '~/global/constants';

import styles from './styles';
import type { Props } from './types';

class Search extends PureComponent<Props, {}> {
  searchResult = ({ item }: Object) => {
    const { toggleSearch } = this.props;
    return (
      <TouchableOpacity
        onPress={toggleSearch}
        style={styles.searchResultContainer}
      >
        <Text style={styles.searchResultText}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  }

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  render() {
    const { items, searchValue } = this.props;
    let result = [];
    if (searchValue.length >= 2) {
      result = items.filter(x => x.title.toLowerCase().trim().indexOf(searchValue) !== -1);
    }
    return (
      <BlurView
        blurAmount={20}
        blurType="light"
        style={styles.blurContainer}
      >
        {!!result.length && (
        <FlatList
          data={result}
          renderItem={this.searchResult}
          keyExtractor={this.keyExtractor}
          keyboardShouldPersistTaps="handled"
        />
        )}
        {!result.length
         && searchValue.length >= 2
         && <Text style={styles.errorText}>{constants.errors.search}</Text>
        }
      </BlurView>
    );
  }
}

export default Search;
