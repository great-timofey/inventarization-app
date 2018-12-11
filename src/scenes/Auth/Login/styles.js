import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.backGroundBlack,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: normalize(30),
    justifyContent: 'space-between',
    paddingHorizontal: normalize(30),
    backgroundColor: colors.backGroundBlack,
  },
  formContainer: {
    justifyContent: 'flex-start',
  },
  additionalButtons: {
    flexDirection: 'row',
    marginTop: normalize(30),
    justifyContent: 'space-between',
  },
  additionalButtonsText: {
    fontSize: normalize(16),
    color: colors.buttonBlue,
    lineHeight: normalize(19),
    paddingHorizontal: normalize(20),
    fontFamily: fonts.proDisplay.light,
  },
});
