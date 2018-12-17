import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: normalize(30),
    paddingHorizontal: normalize(30),
    backgroundColor: colors.backGroundBlack,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: normalize(17),
    color: colors.text.bigGray,
    fontFamily: fonts.proDisplay.light,
  },
});
