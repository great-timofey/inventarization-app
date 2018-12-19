//  @flow

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { isIphoneX } from '~/global/device';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(65),
    paddingTop: normalize(20),
    borderTopColor: colors.white,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    borderTopWidth: isIphoneX ? normalize(15) : 0,
  },
  searchInput: {
    width: normalize(300),
    fontSize: normalize(18),
    marginLeft: normalize(20),
    fontFamily: fonts.proDisplay.regular,
  },
});
