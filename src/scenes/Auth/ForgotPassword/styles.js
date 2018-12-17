import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.backGroundBlack,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: normalize(50),
    paddingBottom: normalize(30),
    paddingHorizontal: normalize(30),
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
    textAlign: 'center',
    fontSize: normalize(18),
    marginTop: normalize(15),
    marginBottom: normalize(25),
    color: colors.text.bigGray,
    fontFamily: fonts.proDisplay.light,
  },
});
