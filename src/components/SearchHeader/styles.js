//  @flow

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { isIphoneX, isAndroid } from '~/global/device';
import { StyleSheet } from 'react-native';

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
  searchInput: {
    width: normalize(300),
    fontSize: normalize(18),
    marginLeft: normalize(20),
    fontFamily: fonts.proDisplay.regular,
  },
  customContStyle: {
    borderRadius: 0,
    paddingRight: normalize(20),
    backgroundColor: colors.transparent,
  },
  customPosition: { top: 5 },
  customIconStyle: { color: colors.blue },
});
