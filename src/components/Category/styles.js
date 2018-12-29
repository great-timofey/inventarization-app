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
    marginLeft: normalize(15),
    justifyContent: 'space-between',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryIcon: {
    alignSelf: 'center',
    marginLeft: normalize(25),
  },
  text: {
    color: colors.white,
    fontSize: normalize(17),
    marginBottom: normalize(5),
    fontFamily: fonts.proDisplay.light,
  },
  arrow: { marginRight: 20 },

});
