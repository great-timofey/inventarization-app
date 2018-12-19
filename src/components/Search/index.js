//  @flow
import React, { Fragment, PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { BlurView } from 'react-native-blur';

import styles from './styles';
import type { Props } from './types';

const SearchResult = ({ title }: Object) => (
  <TouchableOpacity>
    <Text>{title}</Text>
  </TouchableOpacity>
);

class Search extends PureComponent<Props, {}> {
  render() {
    const { items, search } = this.props;
    return (
      <Fragment>
        <BlurView
          blurAmount={20}
          blurType="light"
          style={styles.blurContainer}
        >
          {items.map((item, index) => {
            const itemTitle = item.title.toLowerCase().trim();
            if (search.length >= 2 && itemTitle.indexOf(search) !== -1) {
              return (
                <SearchResult key={index} title={item.title} />
              );
            }
            return null;
          })}
        </BlurView>
      </Fragment>
    );
  }
}

export default Search;
