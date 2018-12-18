// @flow

import { StyleSheet } from 'react-native';

import colors from '../../global/colors';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  rowItem: {
    flexDirection: 'row',
    height: normalize(78),
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 14,
    width: normalize(62),
    height: normalize(62),
    marginRight: normalize(8),
    marginLeft: normalize(20),
    backgroundColor: colors.darkGreen,
  },
  description: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(78),
    borderBottomWidth: 0.5,
    paddingLeft: normalize(10),
    marginRight: normalize(20),
    justifyContent: 'space-between',
    borderBottomColor: colors.border,
  },
  count: {
    borderRadius: 15,
    padding: normalize(7),
    backgroundColor: '#F6F6F6',
  },
  countText: {
    color: colors.text.blue,
    fontSize: normalize(14),
  },
  topText: {
    color: colors.black,
    fontFamily: 'System',
    fontSize: normalize(16),
    lineHeight: normalize(19),
    marginBottom: normalize(3),
  },
  botText: {
    fontFamily: 'System',
    color: colors.text.gray,
    fontSize: normalize(15),
    lineHeight: normalize(18),
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSwipeButton: {
    flex: 1,
    borderRadius: 0,
    width: normalize(80),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  rightSwipeButton: {
    flex: 1,
    borderRadius: 0,
    width: normalize(80),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
  },
});
