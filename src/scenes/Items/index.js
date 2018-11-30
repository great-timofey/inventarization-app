//  @flow
import React, { PureComponent } from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import { withApollo } from 'react-apollo';
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

type Props = {};
class ItemsScene extends PureComponent<Props> {
  state = {
    data: null,
    loading: false,
  };

  getItems = async () => {
    this.setState({ loading: true });
    const { client } = this.props;
    const { data } = await client.query({
      query: GET_REPOS_QUERY,
      variables: { login: 'great-timofey' },
    });
    console.log(data);
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
      name={name}
      description={description}
      repoId={id}
      languageName={languageName}
    />
  );

  render() {
    const { loading, data } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>ITEMS</Text>
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
      </View>
    );
  }
}

export default withApollo(ItemsScene);
