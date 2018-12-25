//  @flow
import React, { PureComponent } from 'react';
import { Text, View, Alert } from 'react-native';

import { compose, graphql, withApollo } from 'react-apollo';
import * as MUTATIONS from '~/graphql/auth/mutations';

import Button from '~/components/Button';

import styles from './styles';

type Props = {};
class ProfileScene extends PureComponent<Props> {
  onLogOut = async () => {
    const {
      logOut,
      client,
      // setAuthMutationClient
    } = this.props;
    console.log();

    try {
      await logOut();
      await client.resetStore();
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Profile</Text>
        <Button title="Logout" onPress={this.onLogOut} />
      </View>
    );
  }
}

export default compose(
  graphql(MUTATIONS.LOG_OUT, {
    name: 'logOut',
  }),
  graphql(MUTATIONS.SET_AUTH_MUTATION_CLIENT, {
    name: 'setAuthMutationClient',
  }),
  withApollo,
)(ProfileScene);
