import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { isIphoneX, isAndroid } from '~/global/device';

export default StyleSheet.create({
  regForm: isAndroid
    ? {
      marginBottom: normalize(100),
    }
    : {
      marginBottom: isIphoneX ? normalize(180) : normalize(130),
    },
  form: isAndroid
    ? {
      marginBottom: normalize(20),
    }
    : {
      marginBottom: isIphoneX ? normalize(99) : normalize(49),
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
  toogleVisiblePasswordBtn: {
    alignSelf: 'center',
    marginRight: normalize(20),
  },
});
