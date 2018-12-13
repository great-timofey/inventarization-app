//  @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';
import { deviceWidth } from 'global/device';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.black,
  },
  hint: {
    position: 'absolute',
    alignItems: 'center',
    width: normalize(242),
    height: normalize(114),
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  hintText: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.proDisplay.light,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomSection: {
    height: normalize(80),
    backgroundColor: colors.black,
  },
});
