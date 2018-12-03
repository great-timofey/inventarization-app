// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  choosePhotoContainer: {
    height: 150,
    paddingTop: 10,
    borderRadius: 7,
    marginBottom: 15,
    backgroundColor: colors.white,
  },
  photo: {
    width: 82,
    height: 82,
    backgroundColor: colors.backGroundBlack,
    marginLeft: 10,
  },
  photoBackgroundImage: {
    width: '100%',
    height: '100%',
  },
  photos: {
    paddingRight: 10,
  },
  openGalleryButton: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
  },
  openGalleryText: {
    fontSize: 18,
    color: colors.buttonBlue,
  },
  cancelButton: {
    height: 50,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cancel,
  },
  cancelButtonText: {
    fontSize: 18,
    color: colors.white,
  },
});
