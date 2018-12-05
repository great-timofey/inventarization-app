// @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 54,
    backgroundColor: colors.buttonBlue,
    borderRadius: 7,
    marginBottom: 30,
  },
  disable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 54,
    backgroundColor: colors.buttonGray,
    borderRadius: 7,
    marginBottom: 30,
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    lineHeight: 21,
  },
  titleTextDisable: {
    color: colors.text.bigGray,
    fontSize: 18,
    lineHeight: 21,
  },
});
