import { StyleSheet } from 'react-native';

import colors from 'global/colors';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.backGroundBlack,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    backgroundColor: colors.backGroundBlack,
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: colors.backGroundBlack,
  },
  headerTitle: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 22,
  },
});
