import { StyleSheet } from 'react-native';

import colors from 'global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 30,
    justifyContent: 'flex-end',
    backgroundColor: colors.backGroundBlack,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text.bigGray,
    textAlign: 'center',
    fontSize: 17,
  },
});
