import { StyleSheet, Dimensions } from 'react-native';

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
    justifyContent: 'flex-end',
    backgroundColor: colors.backGroundBlack,
  },
  formContainerCenter: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 25,
    color: colors.text.bigGray,
    textAlign: 'center',
  },
  headerTitle: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 22,
  },
  headerLeft: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignSelf: 'flex-start',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('screen').width,
    backgroundColor: colors.black,
    height: 56,
    justifyContent: 'center',
  },
  errorText: {
    color: colors.invalidBorder,
    textAlign: 'center',
  },
});
