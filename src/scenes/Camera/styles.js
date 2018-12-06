import { StyleSheet } from 'react-native';

import colors from 'global/colors';
import { normalize } from 'global/utils';

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
    borderRadius: 35,
    alignItems: 'center',
    width: normalize(70),
    height: normalize(70),
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  captureInner: {
    borderWidth: 1,
    borderRadius: 30,
    width: normalize(60),
    height: normalize(60),
    borderColor: colors.black,
    backgroundColor: colors.white,
  },
  topSection: {
    flex: 0,
    height: normalize(45),
    justifyContent: 'center',
    paddingLeft: normalize(20),
  },
  flashButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flashImage: {
    marginRight: 10,
    width: normalize(25),
    height: normalize(25),
  },
  flashTitle: {
    color: colors.white,
  },
  flipImage: {
    width: normalize(32),
    height: normalize(34),
  },
  bottomSection: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalize(30),
    justifyContent: 'space-between',
  },
});
