import { StyleSheet } from 'react-native';
import { normalize } from 'global/utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    color: '#333333',
    textAlign: 'center',
    fontSize: normalize(30),
    marginBottom: normalize(5),
  },
});
