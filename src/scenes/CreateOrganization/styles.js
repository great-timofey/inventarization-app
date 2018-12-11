//  @flow

import { StyleSheet } from 'react-native';

import { fonts } from 'global/styles';
import { normalize } from 'global/utils';
import colors from 'global/colors';

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
  inputContainer: {
    width: '100%',
    borderRadius: 7,
    height: normalize(52),
    paddingTop: normalize(8),
    marginBottom: normalize(10),
    paddingHorizontal: normalize(20),
    backgroundColor: '#FAFAFA',
  },
  inputTitleText: {
    textAlign: 'justify',
    fontSize: normalize(13),
    lineHeight: normalize(15),
    color: colors.text.inputTitle,
    fontFamily: fonts.proDisplay.light,
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
    width: '100%',
    height: '100%',
  },
  photoHint: {
    fontSize: normalize(18),
    color: '#818181',
    textAlign: 'center',
    fontFamily: fonts.proDisplay.light,
  },
});
