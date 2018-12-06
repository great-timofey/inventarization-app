import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    backgroundColor: colors.backGroundBlack,
    paddingBottom: 30,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerLeft: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 18,
    marginTop: 35,
    textAlign: 'center',
    color: colors.text.questionGray,
    fontFamily: fonts.proDisplay.light,
  },
});
