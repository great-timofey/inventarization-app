import { StyleSheet } from 'react-native';

import colors from 'global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.black,
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
    backgroundColor: colors.black,
    marginBottom: 50,
  },
  logoImage: {
    marginBottom: 25,
  },
  formContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  additionalButtons: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  additionalButtonsText: {
    color: colors.buttonBlue,
    fontSize: 16,
    lineHeight: 19,
  },
});
