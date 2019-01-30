// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { normalize } from '~/global/utils';
import { deviceWidth } from '~/global/device';

export default StyleSheet.create({
  rowItem: {
    flexDirection: 'row',
    width: deviceWidth,
    height: normalize(78),
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  smallImage: {
    borderRadius: 14,
    width: normalize(62),
    height: normalize(62),
    marginRight: normalize(8),
    marginLeft: normalize(20),
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
  count: {
    borderRadius: 15,
    padding: normalize(7),
    backgroundColor: '#F6F6F6',
  },
  countText: {
    color: colors.text.blue,
    fontSize: normalize(14),
  },
});
