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
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    marginBottom: 50,
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
});
