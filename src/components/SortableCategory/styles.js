// @flow

import { StyleSheet } from 'react-native';

import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import colors from '~/global/colors';

export default StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(49),
    paddingLeft: normalize(10),
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
  },
  touchableWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drugButtons: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: normalize(15),
    height: normalize(15),
    marginRight: normalize(10),
  },
  dots: {
    marginRight: 4,
    marginBottom: 3,
    borderRadius: 25,
    width: normalize(3),
    height: normalize(3),
    backgroundColor: colors.dotsGray,
  },
  wrapper: {
    flex: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(49),
    marginLeft: normalize(15),
    borderColor: colors.border,
    justifyContent: 'space-between',
  },
  text: {
    color: colors.black,
    fontSize: normalize(17),
    marginBottom: normalize(5),
    fontFamily: fonts.proDisplay.light,
  },
  arrow: {
    marginRight: normalize(40),
  },
});
