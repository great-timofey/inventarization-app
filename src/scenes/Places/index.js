//  @flow
import React, { PureComponent } from 'react';
import { Text, View, Alert } from 'react-native';

import { compose, graphql, withApollo } from 'react-apollo';
import * as MUTATIONS from '~/graphql/auth/mutations';

import Button from '~/components/Button';

import styles from './styles';

type Props = {};
class PlacesScene extends PureComponent<Props> {
  onLogOut = async () => {
    const {
      logOut,
      client,
      setAuthMutationClient,
    } = this.props;
    console.log();

    try {
      await logOut();
      await setAuthMutationClient({ variables: { isAuthed: false } });
      await client.clearStore();
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Places</Text>
        <Button title="dfgsdfdsf" onPress={this.onLogOut} />
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
)(PlacesScene);
