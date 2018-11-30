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

import RateButton from 'components/RateButton';
import Button from 'components/Button';
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

  getItems = async login => {
    this.setState({ loading: true });
    const { client } = this.props;
    const { data } = await client.query({
      query: GET_REPOS_QUERY,
      variables: { login },
    });
    console.log(data);
    this.setState({ data, loading: false });
  };

  render() {
    const { loading, data } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>ITEMS</Text>
        {loading ? (
          <ActivityIndicator />
        ) : data ? (
          <FlatList
            keyExtractor={item => item.node.id}
            data={this.state.data.user.repositories.edges}
            renderItem={({
              item: {
                node: {
                  id,
                  name,
                  description,
                  primaryLanguage: { name: languageName },
                },
              },
            }) => (
              <View
                style={{
                  marginBottom: 5,
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              >
                <Text>
                  {name} : {description} : {languageName}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <RateButton repoId={id} forAdding={true} />
                  <RateButton repoId={id} forAdding={false} />
                </View>
              </View>
            )}
          />
        ) : (
          <TouchableOpacity onPress={() => this.getItems('great-timofey')}>
            <Text>Get Info from Github API</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default withApollo(ItemsScene);
