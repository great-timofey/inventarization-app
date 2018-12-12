//  @flow

import { StyleSheet } from 'react-native';

import { fonts } from 'global/styles';
import colors from 'global/colors';
import { normalize } from 'global/utils';
import { deviceWidth } from 'global/device';

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
    position: 'absolute',
    alignItems: 'center',
    width: normalize(65),
    height: normalize(65),
    bottom: normalize(20),
    justifyContent: 'center',
    backgroundColor: colors.white,
    left: deviceWidth / 2 - normalize(65) / 2,
  },
  captureInner: {
    borderWidth: 2,
    borderRadius: 27.5,
    width: normalize(55),
    height: normalize(55),
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
  flipImage: {
    width: normalize(32),
    height: normalize(34),
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.proDisplay.light,
  },
  bottomSection: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(100),
    marginHorizontal: normalize(30),
    justifyContent: 'space-between',
  },
});
