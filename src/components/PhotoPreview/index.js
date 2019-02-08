// @flow
import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import assets from '~/global/assets';
import { isSmallDevice } from '~/global/utils';

import styles from './styles';
import type { Props } from './types';

class PhotoPreview extends PureComponent<Props> {
  removePicture = () => {
    const { index, removePictureCallback } = this.props;
    removePictureCallback(index);
  };

  get removeButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.removePicture}
        style={[styles.removePhotoIcon, isSmallDevice && styles.smallerIcon]}
      >
        <Image source={assets.deletePhoto} />
      </TouchableOpacity>
    );
  }

  render() {
    const { uri } = this.props;
    return (
      <View style={styles.photoContainer}>
        <Image style={styles.photoImage} source={{ uri }} />
        {this.removeButton}
      </View>
    );
  }
}
export default PhotoPreview;
