// @flow

import { StyleSheet } from 'react-native';

import colors from '../../global/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  rowItem: {
    flex: 1,
    flexDirection: 'row',
    height: 78,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
  },
  image: {
    width: 62,
    height: 62,
    backgroundColor: colors.green, // ToDo
    borderRadius: 14,
    marginRight: 8,
  },
  description: {
    flex: 1,
    height: 78,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    borderBottomColor: colors.border,
    borderBottomWidth: 0.5,
  },
  count: {
    padding: 7,
    backgroundColor: '#F6F6F6',
    borderRadius: 15,
  },
  countText: {
    color: colors.text.blue,
    fontSize: 14,
  },
  topText: {
    fontSize: 16,
    fontFamily: 'System',
    color: colors.black,
    lineHeight: 19,
    marginBottom: 3,
  },
  botText: {
    fontSize: 15,
    fontFamily: 'System',
    lineHeight: 18,
    color: colors.text.gray,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
