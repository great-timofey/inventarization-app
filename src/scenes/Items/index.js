//  @flow
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

type Props = {};
class ItemsScene extends PureComponent<Props> {
  static navigationOptions = () => ({
    title: 'Предметы',
    headerLeft: () => (
      <Icon.Button name="facebook" backgroundColor="#3b5998">
        Login with Facebook
      </Icon.Button>
    ),
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>ITEMS</Text>
      </View>
    );
  }
}

export default ItemsScene;
