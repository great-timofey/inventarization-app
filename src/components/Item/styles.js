// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: normalize(158),
    height: normalize(218),
    marginBottom: normalize(5),
    marginRight: normalize(20),
  },
  image: {
    borderRadius: 10,
    width: normalize(158),
    height: normalize(158),
    marginBottom: normalize(6),
  },
  selectImage: {
    backgroundColor: colors.blackOpacity,
  },
  title: {
    letterSpacing: -0.2,
    fontSize: normalize(16),
    marginBottom: normalize(3),
    fontFamily: fonts.proText.regular,
  },
  price: {
    color: colors.text.gray,
    fontSize: normalize(15),
    fontFamily: fonts.proDisplay.medium,
  },
  menuButton: {
    top: 0,
    right: 0,
    zIndex: 2,
    position: 'absolute',
    width: normalize(23.5),
    paddingTop: normalize(15),
    paddingHorizontal: normalize(20),
  },
  menuButtonDot: {
    borderWidth: 1,
    borderRadius: 50,
    width: normalize(3.55),
    height: normalize(3.55),
    marginBottom: normalize(3.6),
    backgroundColor: colors.white,
    borderColor: colors.blackOpacityLight,
  },
  menu: {
    width: normalize(30),
    height: normalize(30),
    marginBottom: normalize(8),
  },
  menuContainer: {
    top: 10,
    right: 10,
    zIndex: 2,
    position: 'absolute',
  },
  menuOverlay: {
    zIndex: 1,
    borderRadius: 10,
    position: 'absolute',
    width: normalize(158),
    height: normalize(158),
    backgroundColor: colors.assetMenuOverlay,
  },
});
