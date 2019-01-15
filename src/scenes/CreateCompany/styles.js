//  @flow

import { StyleSheet } from 'react-native';

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { deviceWidth, deviceHeight } from '~/global/device';

export default StyleSheet.create({
  container: {
    paddingBottom: normalize(30),
    paddingHorizontal: normalize(30),
    backgroundColor: colors.white,
  },
  wrapper: {
    alignItems: 'center',
    height: normalize(380),
  },
  inviteeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(40),
    paddingLeft: normalize(20),
    marginRight: normalize(10),
    borderRadius: normalize(30),
    justifyContent: 'space-between',
    backgroundColor: colors.buttonInvitee,
  },
  inviteeList: {
    height: normalize(40),
    alignSelf: 'flex-start',
    marginTop: normalize(10),
  },
  inviteeRemove: {
    padding: 0,
    marginRight: normalize(3),
  },
  inviteeTitle: {
    color: colors.white,
  },
  photo: {
    overflow: 'hidden',
    alignItems: 'center',
    width: normalize(110),
    height: normalize(110),
    justifyContent: 'center',
    borderRadius: normalize(55),
    marginBottom: normalize(8),
    backgroundColor: colors.buttonChooseLogo,
  },
  chosenPhoto: {
    width: deviceWidth,
    height: deviceHeight,
  },
  hiddenError: {
    textAlign: 'center',
    fontSize: normalize(13),
    color: colors.transparent,
    marginBottom: normalize(15),
    fontFamily: fonts.proDisplay.regular,
  },
  photoErrorText: {
    color: colors.red,
  },
  photoHint: {
    color: '#818181',
    textAlign: 'center',
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.light,
  },
  photoHintError: {
    color: colors.red,
  },
});
