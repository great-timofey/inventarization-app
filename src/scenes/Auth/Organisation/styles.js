import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
    backgroundColor: colors.backGroundBlack,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
    color: colors.text.bigGray,
    fontFamily: fonts.proDisplay.light,
  },
});
