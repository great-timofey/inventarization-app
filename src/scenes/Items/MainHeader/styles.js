//  @flow

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { StyleSheet } from 'react-native';
import { isIphoneX, isAndroid } from '~/global/device';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: colors.white,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    paddingTop: isAndroid ? 0 : normalize(20),
    borderTopWidth: isIphoneX ? normalize(15) : 0,
    height: isAndroid ? normalize(45) : normalize(65),
  },
  headerTitle: {
    color: 'transparent',
    fontSize: normalize(18),
    lineHeight: normalize(21),
    paddingLeft: normalize(60),
    fontFamily: fonts.proDisplay.regular,
  },
  headerRightButtonsContainer: {
    flexDirection: 'row',
    paddingRight: normalize(10),
  },
});
