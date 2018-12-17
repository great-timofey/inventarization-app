import { StyleSheet } from 'react-native';
import { normalize } from '~/global/utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    textAlign: 'center',
    margin: normalize(10),
    fontSize: normalize(20),
  },
  instructions: {
    color: '#333333',
    textAlign: 'center',
    fontSize: normalize(50),
    marginBottom: normalize(5),
  },
});
