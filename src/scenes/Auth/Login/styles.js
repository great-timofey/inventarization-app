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
  buttonHeader: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginHorizontal: 30,
    borderColor: colors.header.bluebuttonText,
  },
  inactiveHeaderBtn: {
    borderColor: colors.black,
    backgroundColor: colors.black,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.header.bluebuttonText,
  },
  inactiveHeaderBtnText: {
    color: colors.header.grayButtonText,
  },

  activeHeaderButton: {
    marginHorizontal: 30,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.header.bluebuttonText,
    paddingVertical: 7,
  },
  activeHeaderButtonText: {
    color: colors.header.bluebuttonText,
    fontSize: 14,
    lineHeight: 16,
  },
  inactiveHeaderButton: {
    marginHorizontal: 30,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 16,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  additionalButtonsText: {
    padding: 20,
    fontSize: 16,
    lineHeight: 19,
    color: colors.buttonBlue,
  },
});
