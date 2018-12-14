import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: normalize(30),
    justifyContent: 'space-between',
    paddingHorizontal: normalize(30),
    backgroundColor: colors.backGroundBlack,
  },
  wrapper: {
    flex: 1,
  },
  headerLeft: {
    alignSelf: 'flex-start',
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(20),
  },
  text: {
    textAlign: 'center',
    fontSize: normalize(18),
    color: colors.text.questionGray,
    fontFamily: fonts.proDisplay.light,
  },
});
