import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';

export default StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    marginHorizontal: 15,
    backgroundColor: colors.black,
  },
  headerTitleStyle: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.proDisplay.medium,
  },
  backButton: {
    width: 28,
    height: 20,
  },
  skipButtonText: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.proDisplay.medium,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: colors.black,
  },
  hintContainer: {
    height: 80,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  hintText: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.proDisplay.regular,
  },
  // scannerContainer: {
  //   flex: 1,
  //   overflow: 'hidden',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.1)',
  // },
  scannerCameraStyle: {
    flex: 1,
    alignSelf: 'center',
  },
  makePhotoButton: {
    width: 66,
    height: 66,
    bottom: 110,
    borderRadius: 33,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  makePhotoButtonImage: {
    width: 36,
    height: 41,
    opacity: 0.3,
    tintColor: colors.backGroundBlack,
  },
  flashButton: {
    left: 60,
    bottom: 110,
    position: 'absolute',
  },
  flashIcon: {
    width: 50,
    height: 50,
    backgroundColor: colors.transparent,
  },
});
