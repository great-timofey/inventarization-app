// @flow

import React, { PureComponent } from 'react';
import { Image } from 'react-native';

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
      >
        {data.map((photo, index) => (
          <Image key={photo.uri} style={styles.photo} source={{ uri: data[index].uri }} />
        ))}
      </Swiper>
    );
  }
}

export default Carousel;
