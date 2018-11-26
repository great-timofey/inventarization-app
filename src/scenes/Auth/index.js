import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

type Props = { so: string };
export default class AuthScene extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>You aren't logged</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    fontSize: 30,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
