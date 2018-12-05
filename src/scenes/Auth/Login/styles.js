import { StyleSheet } from 'react-native';

import colors from 'global/colors';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.backGroundBlack,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.backGroundBlack,
  },
  formContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  additionalButtons: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  additionalButtonsText: {
    paddingHorizontal: 20,
    fontSize: 16,
    lineHeight: 19,
    color: colors.buttonBlue,
  },
});
