// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  rightHeaderButton: {
    alignSelf: 'flex-start',
    paddingLeft: normalize(20),
  },
  rightHeaderButtonIcon: {
    backgroundColor: colors.white,
  },
  container: {
    padding: normalize(30),
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
    width: normalize(50),
    height: normalize(50),
    margin: normalize(18),
    justifyContent: 'center',
  },
  iconContainerSelect: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.buttonBlue,
  },
  flatlistContainer: {
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.blue,
    fontSize: normalize(18),
    marginTop: normalize(10),
    marginLeft: normalize(20),
    marginBottom: normalize(80),
    fontFamily: fonts.proDisplay.regular,
  },
  withoutMargin: {
    marginBottom: normalize(10),
  },
});
