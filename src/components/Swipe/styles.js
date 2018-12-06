// @flow

import { StyleSheet } from 'react-native';

import { normalize } from 'global/utils';
import colors from '../../global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  rowItem: {
    flex: 1,
    flexDirection: 'row',
    height: normalize(78),
    alignItems: 'center',
    padding: normalize(20),
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 14,
    width: normalize(62),
    height: normalize(62),
    backgroundColor: colors.green,
    marginRight: normalize(8),
  },
  description: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(78),
    paddingLeft: normalize(10),
    justifyContent: 'space-between',
    borderBottomColor: colors.border,
    borderBottomWidth: normalize(0.5),
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
