//  @flow

import colors from '~/global/colors';
import { fonts } from '~/global/styles';
import { normalize } from '~/global/utils';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    fontSize: normalize(34),
    marginBottom: normalize(4),
    paddingHorizontal: normalize(20),
    fontFamily: fonts.proDisplay.bold,
  },
  notItemsText: {
    alignSelf: 'center',
    textAlign: 'center',
    width: normalize(209),
    fontSize: normalize(18),
    color: colors.text.gray,
    marginTop: normalize(22),
    fontFamily: fonts.proDisplay.regular,
  },
  button: {
    borderRadius: 32,
    alignSelf: 'center',
    width: normalize(200),
    marginTop: normalize(20),
  },
  image: {
    width: normalize(104),
    height: normalize(94),
    alignSelf: 'center',
    marginTop: normalize(120),
  },
  horizontalFlatList: {
    alignSelf: 'center',
    paddingLeft: normalize(40),
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
    color: colors.white,
    fontFamily: fonts.proDisplay.regular,
  },
  categoryListContainer: {
    height: normalize(50),
    alignContent: 'center',
    paddingLeft: normalize(20),
    marginBottom: normalize(10),
  },
  categoryButton: {
    zIndex: 2,
    borderRadius: 25,
    left: normalize(10),
    position: 'absolute',
    alignItems: 'center',
    width: normalize(50),
    height: normalize(50),
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  grid: {
    paddingHorizontal: normalize(20),
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sortButtonCustomStyle: {
    position: 'absolute',
    right: normalize(30),
    bottom: normalize(40),
  },
});
