// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  choosePhotoContainer: {
    borderRadius: 7,
    height: normalize(150),
    paddingTop: normalize(10),
    marginBottom: normalize(15),
    backgroundColor: colors.white,
  },
  photo: {
    alignItems: 'center',
    width: normalize(82),
    height: normalize(82),
    marginLeft: normalize(10),
    justifyContent: 'center',
    backgroundColor: colors.backGroundBlack,
  },
  photoBackgroundImage: {
    width: '100%',
    height: '100%',
  },
  photos: {
    paddingRight: normalize(10),
  },
  openGalleryButton: {
    alignItems: 'center',
    height: normalize(60),
    justifyContent: 'center',
    backgroundColor: colors.transparent,
  },
  openGalleryText: {
    fontSize: normalize(18),
    color: colors.buttonBlue,
  },
  cameraIconContainer: {
    width: normalize(30),
    height: normalize(25),
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    position: 'absolute',
  },
  cancelButton: {
    borderRadius: 7,
    alignItems: 'center',
    height: normalize(50),
    justifyContent: 'center',
    backgroundColor: colors.cancel,
  },
  cancelButtonText: {
    color: colors.white,
    fontSize: normalize(18),
  },
});
