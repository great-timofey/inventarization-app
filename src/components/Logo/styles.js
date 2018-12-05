// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';

export default StyleSheet.create({
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backGroundBlack,
    marginBottom: 50,
    marginTop: 40,
  },
  bigLogo: {
    flex: 1,
    justifyContent: 'center',
  },
  logoImage: {
    marginBottom: 25,
  },
});
