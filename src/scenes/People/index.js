//  @flow
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

type Props = {};
export default class PeopleScene extends PureComponent<Props> {
  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>People</Text>
      </View>
    );
  }
}
