// @flow

import { StyleSheet } from 'react-native';

import { normalize, isSmallDevice } from '~/global/utils';

export default StyleSheet.create({
  photoContainer: {
    overflow: 'visible',
    width: normalize(84),
    position: 'relative',
    height: normalize(83),
    marginRight: isSmallDevice ? normalize(8) : normalize(2),
  },
  photoImage: {
    top: 6,
    borderRadius: 15,
    position: 'absolute',
    width: normalize(76),
    height: normalize(76),
  },
  removePhotoIcon: {
    top: 0,
    right: 0,
    overflow: 'visible',
    position: 'absolute',
    width: normalize(26),
    height: normalize(26),
  },
  smallerIcon: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
});
