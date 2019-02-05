import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { deviceWidth, isAndroid } from '~/global/device';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  placesHeaderStyle: {
    marginBottom: normalize(20),
    backgroundColor: colors.white,
  },
  button: {
    color: colors.accent,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
  hideButton: {
    color: colors.white,
  },
  inputView: {
    width: deviceWidth,
    alignItems: 'center',
    marginBottom: normalize(10),
    paddingHorizontal: normalize(25),
  },
  selectActive: {
    marginBottom: normalize(40),
  },
  addressInputView: {
    zIndex: 3,
    top: normalize(120),
    position: 'absolute',
  },
  addressInputViewActive: {
    top: normalize(150),
  },
  submitButton: {
    zIndex: 3,
    width: '85%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: isAndroid ? normalize(45) : normalize(30),
  },
});
