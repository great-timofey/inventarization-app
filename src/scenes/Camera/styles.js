import { StyleSheet } from 'react-native';

import colors from 'global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.black,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  captureInner: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.black,
    backgroundColor: colors.white,
  },
  topSection: {
    flex: 0,
    height: 45,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  flashButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flashImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  flashTitle: {
    color: colors.white,
  },
  flipImage: {
    width: 32,
    height: 34,
  },
  bottomSection: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    justifyContent: 'space-between',
  },
});
