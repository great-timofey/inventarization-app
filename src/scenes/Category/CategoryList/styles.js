// @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { isAndroid } from '~/global/device';

export default StyleSheet.create({
  container: {
    paddingTop: normalize(15),
  },
  addButtonContainer: {
    marginTop: normalize(20),
    marginLeft: normalize(75),
    marginBottom: normalize(30),
  },
  addButtonText: {
    color: colors.blue,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
  header: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
  headerStyle: {
    elevation: 0,
    borderBottomWidth: 0,
  },
  backButton: {
    marginTop: isAndroid ? normalize(5) : 0,
  },
});
