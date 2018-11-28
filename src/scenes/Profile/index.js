//  @flow
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

type Props = {};
export default class ProfileScene extends PureComponent<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Profile</Text>
      </View>
    );
  }
}
