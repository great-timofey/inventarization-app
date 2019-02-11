//  @flow
import React, { PureComponent } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

import { BlurView } from 'react-native-blur';

import constants from '~/global/constants';
import { isAndroid } from '~/global/device';

import styles from './styles';
import type { Props } from './types';

class Search extends PureComponent<Props, {}> {
  openItem = (item: Object) => {
    const { handleOpenItem, toggleSearch, handleOpenPlace } = this.props;
    toggleSearch();
    // eslint-disable-next-line no-underscore-dangle
    if (item.__typename === constants.types.place && handleOpenPlace) {
      handleOpenPlace(item.id, item.name, item.address, item.gps);
    } else if (handleOpenItem) {
      handleOpenItem(item, false);
    }
  }

  searchResult = ({ item }: Object) => (
    <TouchableOpacity
      onPress={() => this.openItem(item)}
      style={styles.searchResultContainer}
    >
      <Text style={styles.searchResultText}>
        {item.name}
      </Text>
    </TouchableOpacity>
  )

  keyExtractor = (el: any, index: number) => `${el.id || index}`;

  render() {
    const { items, searchValue } = this.props;
    let result = [];
    if (searchValue.length >= 2) {
      result = items.filter(x => x.name.toLowerCase().trim().indexOf(searchValue) !== -1);
    }
    const CustomView: any = isAndroid ? View : BlurView;

    return (
      <CustomView
        blurAmount={20}
        blurType="light"
        style={[styles.blurContainer, isAndroid && styles.androidColor]}
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
      </CustomView>
    );
  }
}

export default Search;
