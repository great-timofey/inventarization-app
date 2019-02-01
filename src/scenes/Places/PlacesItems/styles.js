import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { deviceWidth, isIphoneX, isAndroid } from '~/global/device';

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
  placeName: {
    alignSelf: 'flex-start',
    fontSize: normalize(34),
    marginLeft: normalize(20),
    marginBottom: normalize(10),
    fontFamily: fonts.proDisplay.bold,
  },
  headerButtonsWrapper: {
    flexDirection: 'row',
  },
  map: {
    height: normalize(270),
  },
  address: {
    zIndex: 4,
    borderRadius: 7,
    position: 'absolute',
    height: normalize(54),
    justifyContent: 'center',
    marginTop: normalize(90),
    marginLeft: normalize(30),
    paddingHorizontal: normalize(20),
    width: deviceWidth - normalize(60),
    backgroundColor: colors.addressGray,
  },
  topText: {
    fontSize: normalize(13),
    color: colors.input.whiteTitle,
    fontFamily: fonts.proDisplay.regular,
  },
  botText: {
    color: colors.black,
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.regular,
  },
});
