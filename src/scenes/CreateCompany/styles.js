//  @flow

import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';
import { deviceWidth, deviceHeight } from 'global/device';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: normalize(30),
    paddingTop: normalize(23),
    paddingHorizontal: normalize(20),
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: normalize(22),
    textAlign: 'center',
    marginBottom: normalize(25),
    fontFamily: fonts.proDisplay.light,
    color: colors.header.newOrganization,
  },
  inviteeContainer: {
    height: normalize(40),
    marginLeft: normalize(10),
    paddingLeft: normalize(20),
    borderRadius: normalize(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.buttonInvitee,
  },
  inviteeList: {
    marginHorizontal: normalize(-20),
  },
  inviteeRemove: {
    padding: 0,
  },
  inviteeTitle: {
    color: colors.white,
  },
  photo: {
    width: normalize(110),
    height: normalize(110),
    borderRadius: normalize(55),
    marginBottom: normalize(30),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonChooseLogo,
  },
  chosenPhoto: {
    width: deviceWidth,
    height: deviceHeight,
  },
  photoHint: {
    fontSize: normalize(18),
    color: '#818181',
    textAlign: 'center',
    fontFamily: fonts.proDisplay.light,
  },
});
