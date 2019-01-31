// @flow
import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import AndroidViewOverflow from 'react-native-view-overflow';

import assets from '~/global/assets';
import { isAndroid, isSmallDevice } from '~/global/device';

import styles from './styles';
import type { Props } from './types';

class PhotoPreview extends PureComponent<Props> {
  removePicture = () => {
    const { index, removePictureCallback } = this.props;
    removePictureCallback(index);
  };

  // get removeButton() {
  //   return (
  //     <TouchableOpacity
  //       activeOpacity={0.5}
  //       onPress={this.removePicture}
  //       style={[styles.removePhotoIcon, isSmallDevice && styles.smallerIcon]}
  //     >
  //       <AndroidViewOverflow>
  //         <Image source={assets.deletePhoto} />
  //       </AndroidViewOverflow>
  //     </TouchableOpacity>
  //   );
  // };
  //
  // get removeButtonAndroid() {
  //   return (
  //     <AndroidViewOverflow>
  //       {this.removeButton}
  //     </AndroidViewOverflow>
  //   );
  // };

  render() {
    const { uri } = this.props;
    return (
      <View style={styles.photoContainer}>
        <AndroidViewOverflow>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.removePicture}
            style={[styles.removePhotoIcon, isSmallDevice && styles.smallerIcon]}
          >
              <Image source={assets.deletePhoto} />
          </TouchableOpacity>
        </AndroidViewOverflow>
        <Image style={styles.photoImage} source={{ uri }} />
      </View>
    );
  }
}
export default PhotoPreview;
