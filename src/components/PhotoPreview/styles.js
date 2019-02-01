// @flow

import { StyleSheet } from 'react-native';

import { normalize } from '~/global/utils';

export default StyleSheet.create({
  photoContainer: {
    overflow: 'visible',
    width: normalize(76),
    height: normalize(76),
    marginLeft: normalize(10),
  },
  photoImage: {
    borderRadius: 15,
    position: 'relative',
    width: normalize(76),
    height: normalize(76),
  },
  removePhotoIcon: {
    zIndex: 1,
    overflow: 'visible',
    top: normalize(-3),
    right: normalize(-3),
    position: 'absolute',
    width: normalize(26),
    height: normalize(26),
  },
  smallerIcon: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
});
