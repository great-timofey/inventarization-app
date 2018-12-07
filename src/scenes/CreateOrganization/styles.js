//  @flow

import { StyleSheet } from 'react-native';

import { fonts } from 'global/styles';
import { normalize } from 'global/utils';
import colors from 'global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  newOrganizationHeader: {
    borderBottomWidth: 0,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: fonts.proDisplay.light,
    color: colors.header.newOrganization,
  },
  inviteeContainer: {
    height: 40,
    marginLeft: 10,
    paddingLeft: 20,
    borderRadius: 30,
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
    marginHorizontal: -20,
  },
  inviteeRemove: {
    padding: 0,
  },
  inviteeTitle: {
    color: colors.white,
  },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 55,
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
    fontSize: 18,
    color: '#818181',
    textAlign: 'center',
    fontFamily: fonts.proDisplay.light,
  },
});
