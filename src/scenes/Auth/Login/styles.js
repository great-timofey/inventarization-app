import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.backGroundBlack,
  },
  container: {
    flex: 1,
    paddingBottom: 30,
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
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
    fontSize: 16,
    lineHeight: 19,
    paddingHorizontal: 20,
    color: colors.buttonBlue,
    fontFamily: fonts.proDisplay.light,
  },
});
