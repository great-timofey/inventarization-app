// @flow

import React, { PureComponent } from 'react';
import { Image } from 'react-native';

// $FlowFixMe
import Swiper from 'react-native-swiper';

import type { Props } from './types';
import styles from './styles';

class Carousel extends PureComponent<Props> {
  render() {
    const { data, innerRef, ...rest } = this.props;
    return (
      <Swiper
        {...rest}
        loop={false}
        ref={innerRef}
        showsPagination={false}
        removeClippedSubviews={false}
        containerStyle={{ alignSelf: 'stretch' }}
      >
        {data.map(uri => (
          <Image key={uri} style={styles.photo} source={{ uri }} />
        ))}
      </Swiper>
    );
  }
}

export default Carousel;
