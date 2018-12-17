//  @flow

import colors from 'global/colors';
import { fonts } from 'global/styles';
import { normalize } from 'global/utils';
import { isIphoneX } from 'global/device';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(65),
    paddingTop: normalize(20),
    borderTopColor: colors.white,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    borderTopWidth: isIphoneX ? normalize(15) : 0,
  },
  header: {
    fontSize: normalize(34),
    marginBottom: normalize(4),
    fontFamily: fonts.proDisplay.bold,
  },
  headerTitle: {
    color: 'transparent',
    fontSize: normalize(18),
    lineHeight: normalize(21),
    paddingLeft: normalize(60),
    fontFamily: fonts.proDisplay.regular,
  },
  headerRightButtonsContainer: {
    flexDirection: 'row',
    paddingRight: normalize(10),
  },
  container: {
    paddingHorizontal: normalize(20),
  },
  horizontalFlatList: {
    alignSelf: 'center',
    marginLeft: normalize(40),
  },
  tabContainer: {
    borderRadius: 22,
    height: normalize(30),
    justifyContent: 'center',
    marginRight: normalize(10),
    paddingHorizontal: normalize(10),
    backgroundColor: colors.darkGreen,
  },
  tabText: {
    fontSize: 14,
    fontFamily: fonts.proDisplay.regular,
    color: colors.white,
  },
  categoryListContainer: {
    height: normalize(50),
    alignContent: 'center',
    marginBottom: normalize(10),
  },
  categoryButton: {
    zIndex: 2,
    left: -10,
    borderRadius: 25,
    position: 'absolute',
    alignItems: 'center',
    width: normalize(50),
    height: normalize(50),
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  icon: {
    margin: 0,
    padding: 0,
    borderRadius: 25,
    width: normalize(30),
    height: normalize(30),
    backgroundColor: colors.blue,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sortButtonCustomStyle: {
    position: 'absolute',
    right: normalize(30),
    bottom: normalize(40),
    paddingLeft: normalize(3),
  },
});
