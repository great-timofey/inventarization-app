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
    height: normalize(360),
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: normalize(22),
    marginBottom: normalize(25),
    fontFamily: fonts.proDisplay.light,
    color: colors.header.createCompany,
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
    marginBottom: normalize(50),
    backgroundColor: colors.buttonChooseLogo,
  },
  chosenPhoto: {
    width: deviceWidth,
    height: deviceHeight,
  },
  photoHint: {
    color: '#818181',
    textAlign: 'center',
    fontSize: normalize(18),
    fontFamily: fonts.proDisplay.light,
  },
});
