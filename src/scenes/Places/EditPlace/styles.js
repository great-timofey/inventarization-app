import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import { deviceWidth } from '~/global/device';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  placesHeaderStyle: {
    marginBottom: normalize(20),
    backgroundColor: colors.white,
  },
  inputView: {
    width: deviceWidth,
    alignItems: 'center',
    marginBottom: normalize(10),
    paddingHorizontal: normalize(25),
  },
  addressInputView: {
    zIndex: 3,
    top: normalize(100),
    position: 'absolute',
  },
  submitButton: {
    zIndex: 3,
    width: '85%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: normalize(30),
  },
});
