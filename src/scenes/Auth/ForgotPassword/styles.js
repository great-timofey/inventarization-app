import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.backGroundBlack,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    backgroundColor: colors.backGroundBlack,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: colors.backGroundBlack,
  },
  formContainerCenter: {
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 25,
    textAlign: 'center',
    color: colors.text.bigGray,
    fontFamily: fonts.proDisplay.light,
  },
});
