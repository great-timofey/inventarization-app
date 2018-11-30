//  @flow
import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { withApollo, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Item from 'components/Item';
import styles from './styles';

const GET_REPOS_QUERY = gql`
  query myQuery($login: String!) {
    user(login: $login) {
      id
      url
      login
      repositories(first: 3) {
        edges {
          node {
            id
            name
            description
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

const SIGN_IN_MUTATION = gql`
  mutation SignInUser(input: {$email: String!, $password:String!}) {
    signInUser(input: {email: $email, password: $password}) {
      message
      token
    }
  }
`;

type Props = { client: Object };
type State = { data: ?Object, loading: boolean };
class ItemsScene extends PureComponent<Props, State> {
  state = {
    data: null,
    loading: false,
  };

  signIn = () => {
    const user = {
      email: 'ttverdokhlebov@some.team',
      password: '11112222',
    };
    return <Mutation mutation={SIGN_IN_MUTATION}>{}</Mutation>;
  };

  /*
  getItems = async () => {
    this.setState({ loading: true });
    const { client } = this.props;
    const { data } = await client.query({
      query: GET_REPOS_QUERY,
      variables: { login: 'great-timofey' },
    });
    this.setState({ data, loading: false });
  };

  renderItem = ({
    item: {
      node: {
        id,
        name,
        description,
        primaryLanguage: { name: languageName },
      },
    },
  }) => (
    <Item
      repoId={id}
      name={name}
      description={description}
      languageName={languageName}
    />
  );
  */

  render() {
    const { loading, data } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>ITEMS</Text>
        <Button
          onPress={this.signIn}
          style={{ backgroundColor: 'green', flex: 1 }}
          title="sign in"
        />
      </View>
    );
  }
}
/*
  {loading && <ActivityIndicator />}
  {data ? (
    <FlatList
      keyExtractor={item => item.node.id}
      data={data.user.repositories.edges}
      renderItem={this.renderItem}
    />
  ) : (
    !loading && (
      <TouchableOpacity onPress={this.getItems}>
        <Text>Get Info from Github API</Text>
      </TouchableOpacity>
    )
  )}
*/

export default withApollo(ItemsScene);
