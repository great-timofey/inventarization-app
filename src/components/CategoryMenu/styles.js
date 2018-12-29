// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  container: {
    paddingTop: normalize(40),
    backgroundColor: colors.blue,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: normalize(30),
  },
  menuContainer: {
    flexDirection: 'row',
    height: normalize(49),
  },
  wrapper: {
    flex: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: normalize(10),
    justifyContent: 'space-between',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryIcon: {
    alignSelf: 'center',
    marginLeft: normalize(25),
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
  blueBorder: {
    color: colors.blueBorder,
  },
  arrow: { marginRight: 20 },
  editButton: {
    borderWidth: 1,
    borderRadius: 16,
    alignSelf: 'center',
    alignItems: 'center',
    height: normalize(28),
    width: normalize(190),
    justifyContent: 'center',
    marginTop: normalize(10),
    borderColor: colors.white,
    backgroundColor: colors.transparent,
  },
  editButtonText: {
    color: colors.white,
    fontSize: normalize(14),
    fontFamily: fonts.proDisplay.light,
  },
});
