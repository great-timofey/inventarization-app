import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { isIphoneX, isAndroid } from '~/global/device';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: normalize(10),
    paddingRight: normalize(4),
    borderTopColor: colors.white,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    paddingTop: isAndroid ? 0 : normalize(17),
    borderTopWidth: isIphoneX ? normalize(15) : 0,
    height: isAndroid ? normalize(45) : normalize(65),
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
  noPlacesTitle: {
    alignSelf: 'flex-start',
    fontSize: normalize(34),
    marginLeft: normalize(20),
    marginBottom: normalize(100),
    fontFamily: fonts.proDisplay.bold,
  },
  title: {
    marginBottom: normalize(0),
  },
  wrapper: {
    alignItems: 'center',
    width: normalize(200),
  },
  emptyPlacesText: {
    textAlign: 'center',
    fontSize: normalize(18),
    color: colors.modalHints,
    marginTop: normalize(10),
    marginBottom: normalize(25),
    fontFamily: fonts.proDisplay.light,
  },
  button: {
    borderRadius: normalize(323),
  },
});