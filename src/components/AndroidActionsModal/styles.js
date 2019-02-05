// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { deviceWidth } from '~/global/device';

export default StyleSheet.create({
  modal: {
    margin: 0,
    padding: 0,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    position: 'absolute',
    padding: normalize(10),
    width: normalize(178),
    height: normalize(238),
    borderRadius: normalize(17),
    backgroundColor: colors.white,
  },
  photo: {
    borderRadius: 10,
    width: normalize(158),
    height: normalize(158),
    marginBottom: normalize(6),
  },
  name: {
    letterSpacing: -0.2,
    fontSize: normalize(16),
    marginBottom: normalize(3),
    fontFamily: fonts.proText.regular,
  },
  price: {
    color: '#BDBDBD',
    fontSize: normalize(15),
    fontFamily: fonts.proDisplay.medium,
  },
  editButton: {
    width: normalize(315),
    marginBottom: normalize(15),
  },
  delButton: {
    width: normalize(315),
    backgroundColor: colors.red,
    marginBottom: normalize(15),
  },
  rowItem: {
    position: 'absolute',
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
  image: {
    borderRadius: 14,
    width: normalize(62),
    height: normalize(62),
    marginRight: normalize(8),
    marginLeft: normalize(20),
  },
  pinImage: {
    zIndex: 2,
    left: normalize(43),
    width: normalize(16),
    position: 'absolute',
    height: normalize(26),
  },
});
