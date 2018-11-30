import { StyleSheet } from 'react-native';

import colors from 'global/colors';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.backGroundBlack,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.backGroundBlack,
  },
  activeHeaderButton: {
    marginHorizontal: 30,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: colors.header.bluebuttonText,
  },
  activeHeaderButtonText: {
    color: colors.header.bluebuttonText,
    fontSize: 14,
    lineHeight: 16,
  },
  inactiveHeaderButton: {
    marginHorizontal: 30,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.black,
  },
  inactiveHeaderButtonText: {
    color: colors.header.grayButtonText,
    fontSize: 14,
    lineHeight: 16,
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backGroundBlack,
    marginBottom: 50,
    marginTop: 40,
  },
  logoImage: {
    marginBottom: 25,
  },
  formContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'flex-start',
  },
  additionalButtons: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  additionalButtonsText: {
    color: colors.buttonBlue,
    fontSize: 16,
    lineHeight: 19,
  },
});
