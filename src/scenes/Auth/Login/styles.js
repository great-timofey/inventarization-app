import { StyleSheet, Dimensions } from 'react-native';

import colors from 'global/colors';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.backGroundBlack,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.backGroundBlack,
  },
  formContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'flex-start',
  },
  additionalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  additionalButtonsText: {
    padding: 20,
    fontSize: 16,
    lineHeight: 19,
    color: colors.buttonBlue,
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
