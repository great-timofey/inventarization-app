//  @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize, isSmallDevice } from '~/global/utils';
import { deviceHeight, deviceWidth, isIphoneX } from '~/global/device';

export default StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    marginHorizontal: normalize(15),
  },
  headerTitleStyle: {
    marginHorizontal: 0,
    color: colors.black,
    fontWeight: 'normal',
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.medium,
  },
  trashIcon: {
    marginRight: -10,
  },
  backButton: {
    width: 28,
    height: 20,
    tintColor: colors.accent,
  },
  container: {
    flex: 1,
  },
  noPhoto: {
    width: 100,
    height: 93,
    marginBottom: 10,
  },
  preview: {
    width: deviceWidth,
    height: deviceWidth,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    marginBottom: normalize(10),
    backgroundColor: colors.buttonChooseLogo,
  },
  previewModeButtons: {
    zIndex: 1,
    top: normalize(20),
    left: normalize(20),
    position: 'absolute',
    flexDirection: 'row',
  },
  previewModeButton: {
    marginRight: 10,
    borderRadius: 22,
    alignItems: 'center',
    height: normalize(30),
    width: normalize(115),
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  previewModeButtonActive: {
    marginRight: 10,
    borderRadius: 22,
    alignItems: 'center',
    height: normalize(30),
    width: normalize(115),
    justifyContent: 'center',
    backgroundColor: colors.buttonBlue,
  },
  previewModeText: {
    color: colors.black,
    fontSize: normalize(14),
    fontFamily: fonts.proDisplay.light,
  },
  previewModeTextActive: {
    color: colors.white,
    fontSize: normalize(14),
    fontFamily: fonts.proDisplay.light,
  },
  previewText: {
    fontSize: normalize(18),
    color: colors.text.darkGrey,
    fontFamily: fonts.proDisplay.regular,
  },
  previewInfo: {
    left: 20,
    bottom: 20,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(15),
    backgroundColor: colors.white,
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(13),
  },
  previewInfoText: {
    marginLeft: 5,
    color: colors.black,
    fontSize: normalize(14),
    fontFamily: fonts.proDisplay.regular,
  },
  previewPhotoBar: {
    overflow: 'visible',
    height: normalize(90),
    marginBottom: normalize(10),
    backgroundColor: colors.white,
  },
  photosOuter: {
    overflow: 'visible',
  },
  photosInner: {
    alignItems: 'center',
  },
  addPhotoBarButton: {
    borderRadius: 15,
    alignItems: 'center',
    width: normalize(76),
    height: normalize(76),
    justifyContent: 'center',
    marginLeft: normalize(10),
    backgroundColor: colors.buttonChooseLogo,
  },
  removePhotoIcon: {
    zIndex: 1,
    top: normalize(-3),
    right: normalize(-3),
    position: 'absolute',
    width: normalize(26),
    height: normalize(26),
  },
  smallerIcon: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
  photoContainer: {
    width: normalize(76),
    height: normalize(76),
    marginLeft: normalize(10),
  },
  photoImageContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    width: normalize(76),
    height: normalize(76),
  },
  photoImage: {
    width: normalize(76),
    height: normalize(76),
  },
  photo: {
    width: deviceWidth,
    height: deviceWidth,
  },
  formContainer: {
    flex: 1,
  },
  formName: {
    paddingHorizontal: normalize(20),
  },
  formNameHint: {
    fontSize: normalize(13),
    fontFamily: fonts.proDisplay.light,
  },
  formNameInput: {
    fontSize: normalize(24),
    marginBottom: normalize(5),
    fontFamily: fonts.proDisplay.bold,
  },
  formNameError: {
    display: 'none',
    color: colors.red,
    fontSize: normalize(13),
    fontFamily: fonts.proDisplay.light,
  },
  formNameTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formSectionHeaderOverflow: {
    marginHorizontal: normalize(-20),
  },
  formSectionHeader: {
    width: '100%',
    height: normalize(28),
    justifyContent: 'center',
    paddingLeft: normalize(20),
    marginBottom: normalize(10),
  },
  formSectionHeaderText: {
    color: colors.white,
    fontSize: normalize(13),
    fontFamily: fonts.proDisplay.regular,
  },
  formSectionListContainer: {
    paddingHorizontal: normalize(20),
  },
  saveItem: {
    width: deviceWidth,
    alignItems: 'center',
    height: normalize(54),
    justifyContent: 'center',
    backgroundColor: colors.text.blue,
  },
  saveItemText: {
    color: colors.white,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
  dateTimePickerConfirmText: {
    color: colors.black,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.bold,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    borderRadius: 7,
    height: normalize(315),
    marginBottom: normalize(15),
    backgroundColor: colors.white,
  },
  modalCancel: {
    alignItems: 'center',
    height: normalize(54),
    justifyContent: 'center',
    borderRadius: normalize(7),
    backgroundColor: colors.cancel,
  },
  modalCancelText: {
    color: colors.white,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
  modalItem: {
    paddingLeft: 20,
    height: normalize(54),
    justifyContent: 'center',
  },
  modalItemText: {
    color: colors.black,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.light,
  },
  modalSeparator: {
    height: 1,
    backgroundColor: colors.gray,
  },
  customCancelDateTimePickerButton: {
    height: isSmallDevice ? normalize(68) : normalize(58),
    justifyContent: 'center',
    borderRadius: isSmallDevice ? normalize(10) : normalize(7),
    backgroundColor: colors.cancel,
  },
  customCancelDateTimePickerText: {
    padding: 10,
    textAlign: 'center',
    color: colors.white,
    fontSize: normalize(18),
    backgroundColor: 'transparent',
    fontFamily: fonts.proDisplay.light,
  },
  hide: {
    display: 'none',
  },
});
