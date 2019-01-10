// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    height: normalize(49),
  },
  wrapper: {
    flex: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: normalize(60),
    justifyContent: 'space-between',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonWrapper: {
    marginLeft: normalize(15),
  },
  subCategoryIcon: {
    alignSelf: 'center',
    width: normalize(20),
    marginLeft: normalize(25),
  },
  text: {
    color: colors.white,
    fontSize: normalize(17),
    marginBottom: normalize(5),
    fontFamily: fonts.proDisplay.light,
  },
  backButtonText: {
    color: colors.blueBorder,
  },
  select: {
    backgroundColor: colors.blackOpacityExtraLight,
  },
});
