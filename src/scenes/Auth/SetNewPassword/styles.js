import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.backGroundBlack,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: normalize(50),
    paddingBottom: normalize(30),
    paddingHorizontal: normalize(30),
    justifyContent: 'space-between',
    backgroundColor: colors.backGroundBlack,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: colors.backGroundBlack,
  },
});
