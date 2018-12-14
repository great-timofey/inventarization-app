import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  container: {
    paddingHorizontal: normalize(30),
    backgroundColor: colors.backGroundBlack,
  },
  regForm: {
    marginBottom: normalize(96),
  },
  form: {
    marginBottom: normalize(15),
  },
  additionalButtons: {
    flexDirection: 'row',
    marginTop: normalize(28),
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
