//  @flow

import { StyleSheet } from 'react-native';
import colors from 'global/colors';
import { fonts } from 'global/styles';

export default StyleSheet.create({
  headerContainer: {
    height: 65,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 34,
    marginLeft: 20,
    fontFamily: fonts.proDisplay.bold,
  },
  headerRightButtonsContainer: {
    flexDirection: 'row',
    paddingRight: 10,
  },
});
