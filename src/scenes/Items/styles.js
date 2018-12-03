//  @flow

import { StyleSheet } from 'react-native';
import colors from 'global/colors';

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
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 34,
    marginLeft: 20,
  },
  headerRightButtonsContainer: {
    flexDirection: 'row',
    paddingRight: 10,
  },
});
