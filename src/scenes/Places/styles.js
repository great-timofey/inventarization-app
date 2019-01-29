import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import { deviceWidth } from '~/global/device';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
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
});
